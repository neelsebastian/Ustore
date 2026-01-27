const express = require('express');
const router = express.Router();
const Cart = require('../db/models/cart-schema');
const Product = require('../db/models/products-schema');

// 1️⃣ Add product to cart
router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    // check if item already exists
    const existingItem = cart.items.find(
      item =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        size,
        priceAtAddTime: product.price,
      });
    }

    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAddTime,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//  Get user cart
router.get('/add-to-cart/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId }).populate(
      'items.productId'
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    //Remove any items whose product was deleted
    cart.items = cart.items.filter(item => item.productId !== null);

    //Recalculate total
    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAddTime,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Remove product from cart
router.delete('/add-to-cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAddTime,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//Update quantity
router.put('/add-to-cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      i => i.productId.toString() === productId
    );
    if (item) item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAddTime,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
