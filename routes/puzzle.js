// server/routes/puzzle.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isStaff = require('../middleware/isStaff'); // Middleware that checks req.user.role === 'staff'
const Puzzle = require('../models/Puzzle');

// GET active puzzle for players
router.get('/', auth, async (req, res) => {
  try {
    // Return the puzzle marked as active (or, if you prefer, the latest puzzle)
    const puzzle = await Puzzle.findOne({ active: true }).sort({ createdAt: -1 });
    if (!puzzle) {
      return res.status(404).json({ msg: 'No active puzzle found.' });
    }
    res.json(puzzle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST: Staff creates a new puzzle
router.post('/', auth, isStaff, async (req, res) => {
  try {
    const { grid, clues, active } = req.body;
    if (!grid || !clues) {
      return res.status(400).json({ msg: 'Grid and clues are required.' });
    }
    // Optionally, if setting this puzzle as active, mark all others as inactive.
    if (active) {
      await Puzzle.updateMany({ active: true }, { active: false });
    }
    const puzzle = new Puzzle({ grid, clues, active });
    await puzzle.save();
    res.json(puzzle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT: Staff updates an existing puzzle
router.put('/:id', auth, isStaff, async (req, res) => {
  try {
    const { grid, clues, active } = req.body;
    if (active) {
      await Puzzle.updateMany({ active: true }, { active: false });
    }
    const puzzle = await Puzzle.findByIdAndUpdate(
      req.params.id,
      { grid, clues, active },
      { new: true }
    );
    if (!puzzle) {
      return res.status(404).json({ msg: 'Puzzle not found.' });
    }
    res.json(puzzle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;