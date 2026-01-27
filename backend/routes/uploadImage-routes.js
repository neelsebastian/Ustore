const express = require('express');
const router = express.Router();
const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uniqid()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/upload-image', upload.array('images', 5), (req, res) => {
  try {
    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded.' });
    }

    // Map uploaded file URLs
    const imageUrls = req.files.map(
      file => `http://localhost:8000/images/${file.filename}`
    );

    res.status(201).json({
      message: '✅ Images uploaded successfully!',
      urls: imageUrls,
    });
  } catch (err) {
    console.error('🔥 Image upload error:', err);
    res.status(500).json({ error: 'Server error while uploading images.' });
  }
});

module.exports = router;
