// server.js (updated)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// CORS Middleware
app.use(cors({
  origin: "https://access-puzzle-app.vercel.app",
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
