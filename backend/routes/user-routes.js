const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/user-schema');

const router = express.Router();

router.get('/user', async (req, res) => {
  try {
    const dbResponse = await User.find();
    return res.status(200).json(dbResponse);
  } catch (err) {
    return res.status(500).json({ message: e.mesage, error: true });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dbResponse = await User.findById(id);
    return res.status(201).json(dbResponse);
  } catch (err) {
    return res.status(500).json({ message: e.mesage, error: true });
  }
});

router.post('/user/sign-up', async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'email already taken' });
    }

    if (password != confirmPassword) {
      return res.status(400).json({ message: "password doesn't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);
    const dbResponse = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json({ message: 'Account created' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or Password is incorrect' });
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res
        .status(400)
        .json({ message: 'Email or Password is incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '10d',
    });

    return res.status(200).json({
      message: 'Logged In',
      token,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Add new address for a specific user
router.post('/user/:userId/address', async (req, res) => {
  try {
    const { userId } = req.params;
    const newAddress = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.address.push(newAddress);
    await user.save();

    return res.status(200).json({ message: 'Address added', address: user.address });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


// ✅ Update user details (firstname, lastname, email)
router.put('/user/:id', async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, email },
      { new: true }
    );
    res.status(200).json({ message: 'User details updated', updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// ✅ Delete address
router.delete('/user/:userId/address/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.address = user.address.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', address: user.address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Edit address
router.put('/user/:userId/address/:addressId', async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updatedFields = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const address = user.address.id(addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });

    Object.assign(address, updatedFields);
    await user.save();

    res.status(200).json({ message: 'Address updated successfully', address: user.address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update password
router.put('/user/:id/password', async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatching = await bcrypt.compare(oldPassword, user.password);
    if (!isMatching) return res.status(400).json({ message: 'Incorrect old password' });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
