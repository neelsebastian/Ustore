const express = require('express');
const router = express.Router();
const Wishlist = require('../db/models/wishlist-schema');
const Product = require('../db/models/products-schema');
const Cart = require('../db/models/cart-schema');


router.get('/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId })
      .populate('items.productId', 'name price image')
      .lean();

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found', items: [] });
    }

    res.json(wishlist);
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/wishlist/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = new Wishlist({ userId, items: [] });

    const alreadyExists = wishlist.items.some(
      item => item.productId.toString() === productId
    );
    if (alreadyExists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.items.push({ productId });
    await wishlist.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    console.error('Error adding to wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// remove
router.delete('/wishlist/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: 'Removed from wishlist', wishlist });
  } catch (err) {
    console.error('Error removing from wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// move to cart
router.post('/wishlist/move-to-cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [], totalAmount: 0 });

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
        priceAtAddTime: product.price,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAddTime,
      0
    );
    await cart.save();

    await Wishlist.updateOne(
      { userId },
      { $pull: { items: { productId } } }
    );

    res.status(200).json({ message: 'Moved to cart successfully', cart });
  } catch (err) {
    console.error('Error moving to cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Move product from cart to wishlist
router.post('/wishlist/move-from-cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // ✅ Step 1: Remove product from user's cart
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
      );
      cart.totalAmount = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.priceAtAddTime,
        0
      );
      await cart.save();
    }

    // ✅ Step 2: Add product to wishlist (if not already present)
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = new Wishlist({ userId, items: [] });

    const alreadyExists = wishlist.items.some(
      item => item.productId.toString() === productId
    );

    if (!alreadyExists) {
      wishlist.items.push({ productId });
      await wishlist.save();
    }

    res.status(200).json({ message: 'Moved to wishlist successfully' });
  } catch (err) {
    console.error('Error moving to wishlist:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
