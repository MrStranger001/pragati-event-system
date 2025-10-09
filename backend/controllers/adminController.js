const User = require('../models/User');

// Only Super Admin creates/dismantles admins
exports.createAdmin = async (req, res) => {
  const requestingUser = await User.findById(req.user.id);
  if (requestingUser.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });

  const { name, email, password, role } = req.body;
  if (!['stall_admin', 'ncc_admin'].includes(role)) return res.status(400).json({ error: 'Invalid admin type' });

  const admin = new User({ name, email, password, role, emailVerified: true });
  await admin.save();
  res.json({ message: `${role} created.` });
};

exports.removeAdmin = async (req, res) => {
  const requestingUser = await User.findById(req.user.id);
  if (requestingUser.role !== 'super_admin') return res.status(403).json({ error: 'Forbidden' });

  const { adminId } = req.body;
  await User.findByIdAndDelete(adminId);
  res.json({ message: 'Admin removed.' });
};