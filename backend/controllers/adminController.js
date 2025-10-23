const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

// Only Super Admin creates/dismantles admins
exports.createAdmin = async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);
    if (requestingUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { name, email, password, role } = req.body;
    if (!['stall_admin', 'ncc_admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid admin type' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role, 
      emailVerified: true 
    });
    await admin.save();
    res.json({ message: `${role} created.`, success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);
    if (requestingUser.role !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { adminId } = req.body;
    
    // Validate adminId format
    if (!adminId || !adminId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid admin ID' });
    }
    
    await User.findByIdAndDelete(adminId);
    res.json({ message: 'Admin removed.', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!['super_admin', 'stall_admin', 'ncc_admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Get events created by this admin
    const myEvents = await Event.find({ createdBy: req.user.id })
      .populate('attendees', 'name email energy points phone');

    // Get all students
    const allStudents = await User.find({ role: 'student' })
      .select('name email energy points phone createdAt');

    // Get total event count
    const totalEvents = await Event.countDocuments({ createdBy: req.user.id });

    // Get total students enrolled across all events
    const totalEnrollments = myEvents.reduce((sum, event) => sum + event.attendees.length, 0);

    res.json({
      success: true,
      stats: {
        totalEvents,
        totalEnrollments,
        totalStudents: allStudents.length
      },
      events: myEvents,
      students: allStudents
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!['super_admin', 'stall_admin', 'ncc_admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const students = await User.find({ role: 'student' })
      .select('name email energy points phone createdAt');

    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getEventEnrollments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!['super_admin', 'stall_admin', 'ncc_admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const event = await Event.findById(req.params.eventId)
      .populate('attendees', 'name email energy points phone');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ 
      success: true, 
      event: {
        name: event.name,
        description: event.description,
        date: event.date,
        attendees: event.attendees,
        totalEnrollments: event.attendees.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};