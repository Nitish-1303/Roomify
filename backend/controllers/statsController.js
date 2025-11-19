const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');

exports.getOverview = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Total bookings this month
    const totalBookingsThisMonth = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    // Status breakdown
    const statusBreakdown = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusCounts = {
      pending: 0,
      approved: 0,
      rejected: 0
    };
    statusBreakdown.forEach(item => {
      statusCounts[item._id] = item.count;
    });

    // Most booked room
    const mostBookedRoom = await Booking.aggregate([
      {
        $group: {
          _id: '$roomId',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: '_id',
          as: 'room'
        }
      },
      { $unwind: '$room' }
    ]);

    // Peak usage hours
    const peakHours = await Booking.aggregate([
      {
        $project: {
          hour: { $hour: '$start' }
        }
      },
      {
        $group: {
          _id: '$hour',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Recent bookings trend (last 7 days)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const bookingsTrend = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Total users
    const totalUsers = await User.countDocuments();

    // Total rooms
    const totalRooms = await Room.countDocuments();

    res.json({
      totalBookingsThisMonth,
      statusCounts,
      mostBookedRoom: mostBookedRoom[0] || null,
      peakHours,
      bookingsTrend,
      totalUsers,
      totalRooms,
      pendingApprovals: statusCounts.pending
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
