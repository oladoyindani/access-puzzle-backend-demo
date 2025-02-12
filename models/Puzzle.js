// server/models/Puzzle.js
const mongoose = require('mongoose');

const ClueSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  text: { type: String, required: true },
  answer: { type: String, required: true },
  // Optionally include position and direction for easier grid generation
  position: { row: Number, col: Number },
  direction: { type: String, enum: ['across', 'down'] },
});

const PuzzleSchema = new mongoose.Schema(
  {
    grid: { type: [[Object]], required: true },  // a 2D array of cell objects
    clues: { type: [ClueSchema], required: true },
    active: { type: Boolean, default: false }    // if true, this is the active puzzle for players
  },
  { timestamps: true }
);

module.exports = mongoose.model('Puzzle', PuzzleSchema);