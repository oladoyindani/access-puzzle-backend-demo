// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    staffId: { type: String }, // optional for players; required for staff login
    role: { 
      type: String, 
      enum: ['player', 'staff'], 
      default: 'player' 
    },
    password: { type: String }, // optional if you’re not using password auth
    score: { type: Number, default: 0 },
    progress: { type: Object, default: {} },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
