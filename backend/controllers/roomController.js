const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    if (!name || !location || !capacity) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const room = new Room({ name, location, capacity });
    await room.save();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ name: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
