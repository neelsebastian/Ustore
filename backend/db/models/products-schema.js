const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  brand: { type: String, trim: true },
  price: { type: Number, required: true },
  image: [{ type: String, required: true }],
  category: { type: String, required: true, trim: true },
  subCategory: { type: String, trim: true },
  audience: {
    type: String,
    enum: ['Men', 'Women', 'Kids', 'All'],
  },
  attributes: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {},
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const Product = model('products', productSchema);

module.exports = Product;
