const { Schema, model } = require('mongoose');

const addressSchema = Schema({
  houseName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  alternateNumber: {
    type: String,
    trim: true,
  },
});

const userSchema = Schema({
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true },
  email: { type: Schema.Types.Mixed, trim: true, required: true, unique: true },
  address: [addressSchema],
  password: {
    type: Schema.Types.Mixed,
    trim: true,
    required: true,
    unique: true,
  },
});

const User = model('users', userSchema);

module.exports = User;
