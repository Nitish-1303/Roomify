const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { Parser } = require('json2csv');

exports.exportBookings = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    
    const query = {};
    if (startDate && endDate) {
      query.start = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .populate('roomId', 'name location capacity')
      .sort({ createdAt: -1 });

    const data = bookings.map(booking => ({
      'Booking ID': booking._id,
      'User Name': booking.userId?.name,
      'User Email': booking.userId?.email,
      'Room Name': booking.roomId?.name,
      'Room Location': booking.roomId?.location,
      'Start Time': booking.start,
      'End Time': booking.end,
      'Status': booking.status,
      'Created At': booking.createdAt
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.exportRoomUtilization = async (req, res) => {
  try {
    const rooms = await Room.find();
    
    const utilizationData = await Promise.all(
      rooms.map(async (room) => {
        const totalBookings = await Booking.countDocuments({ roomId: room._id });
        const approvedBookings = await Booking.countDocuments({ 
          roomId: room._id, 
          status: 'approved' 
        });
        const pendingBookings = await Booking.countDocuments({ 
          roomId: room._id, 
          status: 'pending' 
        });

        return {
          'Room Name': room.name,
          'Location': room.location,
          'Capacity': room.capacity,
          'Total Bookings': totalBookings,
          'Approved Bookings': approvedBookings,
          'Pending Bookings': pendingBookings,
          'Utilization Rate': totalBookings > 0 ? `${((approvedBookings / totalBookings) * 100).toFixed(2)}%` : '0%'
        };
      })
    );

    const parser = new Parser();
    const csv = parser.parse(utilizationData);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=room-utilization.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export room utilization error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRoomCalendar = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { start, end } = req.query;

    const query = { roomId };
    if (start && end) {
      query.start = { $gte: new Date(start), $lte: new Date(end) };
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .sort({ start: 1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get room calendar error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
