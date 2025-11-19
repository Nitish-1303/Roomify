const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.getSuggestions = async (req, res) => {
  try {
    const { date, duration = 60, capacity } = req.query;
    
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    // Get all rooms
    let roomsQuery = {};
    if (capacity) {
      roomsQuery.capacity = { $gte: parseInt(capacity) };
    }
    const rooms = await Room.find(roomsQuery);

    // Get all bookings for the day
    const bookings = await Booking.find({
      start: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'approved'] }
    });

    // Business hours: 8 AM to 6 PM
    const businessHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const suggestions = [];

    for (const room of rooms) {
      const roomBookings = bookings.filter(b => b.roomId.toString() === room._id.toString());
      
      for (const hour of businessHours) {
        const slotStart = new Date(targetDate);
        slotStart.setHours(hour, 0, 0, 0);
        const slotEnd = new Date(slotStart.getTime() + parseInt(duration) * 60000);

        // Check if slot is available
        const hasConflict = roomBookings.some(booking => {
          return (
            (slotStart >= booking.start && slotStart < booking.end) ||
            (slotEnd > booking.start && slotEnd <= booking.end) ||
            (slotStart <= booking.start && slotEnd >= booking.end)
          );
        });

        if (!hasConflict && suggestions.length < 5) {
          suggestions.push({
            room: {
              id: room._id,
              name: room.name,
              location: room.location,
              capacity: room.capacity,
              amenities: room.amenities
            },
            timeSlot: {
              start: slotStart,
              end: slotEnd,
              duration: parseInt(duration)
            },
            score: calculateScore(room, hour, roomBookings.length)
          });
        }
      }
    }

    // Sort by score (best suggestions first)
    suggestions.sort((a, b) => b.score - a.score);

    res.json(suggestions.slice(0, 5));
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

function calculateScore(room, hour, bookingCount) {
  let score = 100;
  
  // Prefer rooms with fewer bookings (less busy)
  score -= bookingCount * 5;
  
  // Prefer mid-morning and mid-afternoon slots
  if (hour >= 10 && hour <= 11) score += 10;
  if (hour >= 14 && hour <= 15) score += 10;
  
  // Slight penalty for early morning and late afternoon
  if (hour === 8 || hour === 17) score -= 5;
  
  // Bonus for rooms with more amenities
  if (room.amenities) {
    const amenityCount = Object.values(room.amenities).filter(Boolean).length;
    score += amenityCount * 2;
  }
  
  return score;
}

exports.getHeatmap = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const heatmapData = await Booking.aggregate([
      {
        $match: {
          start: { $gte: start, $lte: end },
          status: 'approved'
        }
      },
      {
        $project: {
          roomId: 1,
          hour: { $hour: '$start' },
          dayOfWeek: { $dayOfWeek: '$start' }
        }
      },
      {
        $group: {
          _id: {
            roomId: '$roomId',
            hour: '$hour',
            dayOfWeek: '$dayOfWeek'
          },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: '_id.roomId',
          foreignField: '_id',
          as: 'room'
        }
      },
      {
        $unwind: '$room'
      },
      {
        $sort: { '_id.dayOfWeek': 1, '_id.hour': 1 }
      }
    ]);

    res.json(heatmapData);
  } catch (error) {
    console.error('Get heatmap error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
