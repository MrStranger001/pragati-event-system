const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, description, date } = req.body;
  const event = new Event({ name, description, date, createdBy: req.user.id });
  await event.save();
  res.json({ message: 'Event created.' });
};

exports.registerForEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.attendees.push(req.user.id);
  await event.save();
  res.json({ message: 'Registered for event.' });
};