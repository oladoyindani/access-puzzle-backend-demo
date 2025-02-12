// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const puzzleRoutes = require('./routes/puzzle');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/puzzle', puzzleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Start server
//app.listen(port, () => {
  //console.log(`Server is running on port ${port}`);
//});
const port = process.env.PORT || 3000; // Use Render's PORT or default to 3000
app.listen(port, () => console.log(`Server running on port ${port}`));
