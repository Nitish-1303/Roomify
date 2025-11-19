const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.createBooking = async (req, res) => {
  try {
    const { roomId, start, end } = req.body;

    if (!roomId || !start || !end) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate <= startDate) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const overlapping = await Booking.findOne({
      roomId,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { start: { $lt: endDate }, end: { $gt: startDate } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ error: 'Room already booked for this time slot' });
    }

    const booking = new Booking({
      userId: req.user._id,
      roomId,
      start: startDate,
      end: endDate
    });

    await booking.save();
    await booking.populate('roomId userId', 'name location capacity email');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    
    const bookings = await Booking.find(query)
      .populate('roomId', 'name location capacity')
      .populate('userId', 'name email')
      .sort({ start: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'approved';
    await booking.save();
    await booking.populate('roomId userId', 'name location capacity email');

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'rejected';
    await booking.save();
    await booking.populate('roomId userId', 'name location capacity email');

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
