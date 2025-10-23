const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, notificationPreference } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    
    if (!email.endsWith('@pragati.edu')) {
      return res.status(400).json({ error: 'Only Pragati emails allowed' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      phone: phone || '', 
      notificationPreference: notificationPreference || 'email',
      emailVerified: true // No OTP verification needed
    });
    
    await user.save();

    res.json({ message: 'Registration successful. You can now log in.', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.json({ 
      message: 'Login successful',
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.updatePhone = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    await User.findByIdAndUpdate(req.user.id, { phone });
    
    res.json({ message: 'Phone number updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};