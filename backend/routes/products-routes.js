const express = require('express');
const router = express.Router();
const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');
const Product = require('../db/models/products-schema');

//  Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uniqid()}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

//Create a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Failed to create product', details: err.message });
  }
});


// Get all products (with filters)
router.get('/products', async (req, res) => {
  try {
    const {
      audience,
      brand,
      color,
      minprice,
      maxprice,
      category,
      subCategory,
      search,
      userId, // 👈 receive logged-in user ID from frontend
    } = req.query;

    const query = {};

    if (audience) query.audience = { $regex: `^${audience}$`, $options: 'i' };
    if (brand) query.brand = { $regex: `^${brand}$`, $options: 'i' };
    if (color) query['attributes.color'] = { $regex: `^${color}$`, $options: 'i' };
    if (category) query.category = { $regex: `^${category}$`, $options: 'i' };
    if (subCategory)
      query.subCategory = { $regex: `^${subCategory}$`, $options: 'i' };

    if (minprice || maxprice) {
      query.price = {};
      if (minprice) query.price.$gte = Number(minprice);
      if (maxprice) query.price.$lte = Number(maxprice);
    }

    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { audience: { $regex: search, $options: 'i' } },
      ];
    }

    // 👇 Exclude products added by the logged-in user
    if (userId) {
      query.userId = { $ne: userId };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error while fetching products.' });
  }
});


//Get single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Server error while fetching product.' });
  }
});

// Get products by userId
router.get('/products/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching user products:', err);
    res
      .status(500)
      .json({ error: 'Server error while fetching user products.' });
  }
});

// Delete product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Server error while deleting product.' });
  }
});

// Update Edit product
router.put('/products/:id', upload.array('images', 5), async (req, res) => {
  try {
    let updateData = req.body;

    // update image URLs
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(
        file => `http://localhost:8000/images/${file.filename}`
      );
      updateData.image = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating product.' });
  }
});

module.exports = router;
