const express = require('express');
const router = express.Router();
const Order = require('../db/models/order-schema');
const Cart = require('../db/models/cart-schema');

// Place Order (move from Cart to Orders)
router.post('/order/place-order', async (req, res) => {
  try {
    const { userId } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    // Calculate delivery date (e.g. +4 days)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);

    // Create new order
    const newOrder = new Order({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        size: item.size,
        priceAtOrderTime: item.priceAtAddTime,
      })),
      totalAmount: cart.totalAmount,
      deliveryDate,
    });

    await newOrder.save();

    // Empty the cart after placing order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Get all orders of a user
router.get('/order/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
