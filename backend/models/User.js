const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'super_admin', 'stall_admin', 'ncc_admin'], default: 'student' },
  notificationPreference: { type: String, enum: ['email', 'sms'], default: 'email' },
  phone: { type: String, required: false },
  emailVerified: { type: Boolean, default: true },
  energy: { type: Number, default: 100 },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);