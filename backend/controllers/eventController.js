const Event = require('../models/Event');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location, category, maxAttendees, imageUrl } = req.body;
    
    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (!['super_admin', 'stall_admin', 'ncc_admin'].includes(user.role)) {
      return res.status(403).json({ error: 'Only admins can create events' });
    }

    const event = new Event({ 
      name, 
      description, 
      date, 
      location,
      category,
      maxAttendees,
      imageUrl,
      createdBy: req.user.id,
      status: 'published'
    });
    
    await event.save();
    res.json({ message: 'Event created successfully', success: true, event });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'published' })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email phone');
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if already registered
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Check max attendees
    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ error: 'Event is full' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    // Send notification
    const user = await User.findById(req.user.id);
    const message = `You have successfully registered for ${event.name} on ${event.date}`;
    
    try {
      if (user.notificationPreference === 'email' && user.email) {
        await sendEmail(user.email, 'Event Registration Confirmation', message);
      } else if (user.notificationPreference === 'sms' && user.phone) {
        await sendSMS(user.phone, message);
      }
    } catch (notifError) {
      console.error('Notification error:', notifError);
      // Don't fail registration if notification fails
    }

    res.json({ message: 'Registered for event successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ attendees: req.user.id })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};