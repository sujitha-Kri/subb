const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path if needed
const bcrypt = require('bcrypt');

// POST /signup
router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send('User already registered');
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).send('Signup successful!');
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

module.exports = router;
