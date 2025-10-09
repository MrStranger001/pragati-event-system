// const User = require('../models/User');
// const generateOTP = require('../utils/otp');
// const sendEmail = require('../utils/sendEmail');
// const sendSMS = require('../utils/sendSMS');

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone, notificationPreference } = req.body;
//     if (!name || !email || !password || !phone || !notificationPreference) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
//     if (!email.endsWith('@pragati.edu')) return res.status(400).json({ error: 'Only Pragati emails allowed' });

//     const otp = generateOTP();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

//     const user = new User({ name, email, password, phone, notificationPreference, otp, otpExpires });
//     await user.save();

//     // Send OTP via preferred channel
//     if (notificationPreference === 'email') {
//       await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);
//     } else {
//       await sendSMS(phone, `Your OTP is ${otp}`);
//     }
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ error: 'Email and OTP are required' });
//     }
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     if (user.otp !== otp || user.otpExpires < new Date()) {
//       return res.status(400).json({ error: 'Invalid or expired OTP' });
//     }
//     user.emailVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();
//     res.json({ message: 'Email verified. You can now log in.' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };  return res.status(400).json({ error: 'Invalid or expired OTP' });
//   }
//   user .emailVerified = true;
//   user.otp = null;
//   user.otpExpires = null;
//   await user.save();
//   res.json({ message: 'Email verified. You can now log in.' });
// };
const User = require('../models/User');
const generateOTP = require('../utils/otp');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

exports.register = async (req, res) => {
  const { name, email, password, phone, notificationPreference } = req.body;
  if (!email.endsWith('@pragati.edu')) return res.status(400).json({ error: 'Only Pragati emails allowed' });

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  const user = new User({ name, email, password, phone, notificationPreference, otp, otpExpires });
  await user.save();

  // Send OTP via preferred channel
  if (notificationPreference === 'email') {
    await sendEmail(email, 'Your OTP Code', `Your OTP is ${otp}`);
  } else {
    await sendSMS(phone, `Your OTP is ${otp}`);
  }

  res.json({ message: 'Registration started. Please verify OTP sent to your email/SMS.' });
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }
  user.emailVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  res.json({ message: 'Email verified. You can now log in.' });
};