const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'super_admin', 'stall_admin', 'ncc_admin'], default: 'student' },
  notificationPreference: { type: String, enum: ['email', 'sms'], default: 'email' },
  phone: String,
  emailVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
});
module.exports = mongoose.model('User', userSchema);