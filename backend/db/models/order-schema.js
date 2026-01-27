const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
        },
        priceAtOrderTime: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
    status: {
      type: String,
      default: 'Processing',
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
  },
  { timestamps: true }
);

module.exports = model('orders', orderSchema);
