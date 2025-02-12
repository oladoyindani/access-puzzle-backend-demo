// server/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isStaff = require('../middleware/isStaff');
const User = require('../models/User');

// Return the top scoring users
router.get('/', auth, isStaff, async (req, res) => {
  try {
    const topUsers = await User.find().sort({ score: -1 }).limit(10);
    res.json(topUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
