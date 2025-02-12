// server/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// Player Login: Only email and name required.
router.post('/player-login', async (req, res) => {
  try {
    console.log('Player login request:', req.body);
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ msg: 'Email and name are required.' });
    }

    // Find an existing user or create a new one as a player
    let user = await User.findOne({ email, name });
    if (!user) {
      user = new User({ email, name, role: 'player' });
      await user.save();
      console.log('New player created:', user);
    } else {
      console.log('Existing player found:', user);
    }

    // Create a JWT token for the user
    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error('Error in player login:', err.message);
    res.status(500).json({ msg: 'Server error during player login.' });
  }
});

// staff login
router.post('/staff-login', async (req, res) => {
  try {
    console.log('Staff login request:', req.body);
    const { email, name, staffId } = req.body;
    if (!email || !name || !staffId) {
      return res.status(400).json({ msg: 'Email, name, and staff ID are required.' });
    }

    // Look for an existing staff user with the given details
    const user = await User.findOne({ email, name, staffId });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials or staff not recognized.' });
    }

    // Ensure the user is marked as staff
    if (user.role !== 'staff') {
      user.role = 'staff';
      await user.save();
    }

    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '100h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error('Error in staff login:', err.message);
    res.status(500).json({ msg: 'Server error during staff login.' });
  }
});

module.exports = router;
