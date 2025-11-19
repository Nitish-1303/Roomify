require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const MaintenanceIssue = require('./models/MaintenanceIssue');
const Notification = require('./models/Notification');
const AuditLog = require('./models/AuditLog');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    await Booking.deleteMany({});
    await MaintenanceIssue.deleteMany({});
    await Notification.deleteMany({});
    await AuditLog.deleteMany({});

    // Create Users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@roomify.com',
      passwordHash: adminPassword,
      role: 'admin'
    });

    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'user@roomify.com',
        passwordHash: userPassword,
        role: 'user'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@roomify.com',
        passwordHash: userPassword,
        role: 'user'
      },
      {
        name: 'Michael Chen',
        email: 'michael@roomify.com',
        passwordHash: userPassword,
        role: 'user'
      },
      {
        name: 'Emily Davis',
        email: 'emily@roomify.com',
        passwordHash: userPassword,
        role: 'user'
      },
      {
        name: 'David Wilson',
        email: 'david@roomify.com',
        passwordHash: userPassword,
        role: 'user'
      }
    ]);

    // Create Rooms with amenities
    const rooms = await Room.insertMany([
      {
        name: 'Conference Room A',
        location: 'Floor 1',
        capacity: 10,
        amenities: {
          projector: true,
          avSystem: true,
          whiteboard: true,
          ac: true,
          videoConference: true,
          smartBoard: false
        },
        seatingType: 'Boardroom',
        description: 'Modern conference room with state-of-the-art AV equipment'
      },
      {
        name: 'Conference Room B',
        location: 'Floor 2',
        capacity: 6,
        amenities: {
          projector: true,
          avSystem: true,
          whiteboard: true,
          ac: true,
          videoConference: false,
          smartBoard: false
        },
        seatingType: 'U-Shape',
        description: 'Cozy meeting space perfect for small team discussions'
      },
      {
        name: 'Board Room',
        location: 'Floor 3',
        capacity: 20,
        amenities: {
          projector: true,
          avSystem: true,
          whiteboard: true,
          ac: true,
          videoConference: true,
          smartBoard: true
        },
        seatingType: 'Boardroom',
        description: 'Executive boardroom with premium furnishings'
      },
      {
        name: 'Meeting Room 1',
        location: 'Floor 1',
        capacity: 4,
        amenities: {
          projector: false,
          avSystem: false,
          whiteboard: true,
          ac: true,
          videoConference: false,
          smartBoard: false
        },
        seatingType: 'Classroom',
        description: 'Quick huddle room for small team meetings'
      },
      {
        name: 'Meeting Room 2',
        location: 'Floor 2',
        capacity: 8,
        amenities: {
          projector: true,
          avSystem: true,
          whiteboard: true,
          ac: true,
          videoConference: true,
          smartBoard: false
        },
        seatingType: 'Theater',
        description: 'Versatile meeting space with flexible seating'
      }
    ]);

    // Create Demo Bookings (Past, Present, and Future)
    const now = new Date();
    const bookings = [];

    // Past bookings (last 7 days)
    for (let i = 7; i > 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Morning bookings
      bookings.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        roomId: rooms[Math.floor(Math.random() * rooms.length)]._id,
        start: new Date(date.setHours(9, 0, 0, 0)),
        end: new Date(date.setHours(10, 0, 0, 0)),
        status: 'approved'
      });

      // Afternoon bookings
      bookings.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        roomId: rooms[Math.floor(Math.random() * rooms.length)]._id,
        start: new Date(date.setHours(14, 0, 0, 0)),
        end: new Date(date.setHours(15, 30, 0, 0)),
        status: 'approved'
      });
    }

    // Today's bookings
    const today = new Date();
    bookings.push(
      {
        userId: users[0]._id,
        roomId: rooms[0]._id,
        start: new Date(today.setHours(10, 0, 0, 0)),
        end: new Date(today.setHours(11, 0, 0, 0)),
        status: 'approved'
      },
      {
        userId: users[1]._id,
        roomId: rooms[1]._id,
        start: new Date(today.setHours(11, 30, 0, 0)),
        end: new Date(today.setHours(12, 30, 0, 0)),
        status: 'approved'
      },
      {
        userId: users[2]._id,
        roomId: rooms[2]._id,
        start: new Date(today.setHours(13, 0, 0, 0)),
        end: new Date(today.setHours(14, 30, 0, 0)),
        status: 'pending'
      },
      {
        userId: users[3]._id,
        roomId: rooms[3]._id,
        start: new Date(today.setHours(15, 0, 0, 0)),
        end: new Date(today.setHours(16, 0, 0, 0)),
        status: 'pending'
      }
    );

    // Future bookings (next 7 days)
    for (let i = 1; i <= 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      bookings.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        roomId: rooms[Math.floor(Math.random() * rooms.length)]._id,
        start: new Date(date.setHours(10, 0, 0, 0)),
        end: new Date(date.setHours(11, 30, 0, 0)),
        status: Math.random() > 0.3 ? 'approved' : 'pending'
      });

      bookings.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        roomId: rooms[Math.floor(Math.random() * rooms.length)]._id,
        start: new Date(date.setHours(14, 0, 0, 0)),
        end: new Date(date.setHours(15, 0, 0, 0)),
        status: Math.random() > 0.3 ? 'approved' : 'pending'
      });
    }

    // Some rejected bookings
    bookings.push(
      {
        userId: users[4]._id,
        roomId: rooms[0]._id,
        start: new Date(today.setHours(16, 0, 0, 0)),
        end: new Date(today.setHours(17, 0, 0, 0)),
        status: 'rejected'
      },
      {
        userId: users[3]._id,
        roomId: rooms[1]._id,
        start: new Date(today.setHours(17, 0, 0, 0)),
        end: new Date(today.setHours(18, 0, 0, 0)),
        status: 'rejected'
      }
    );

    await Booking.insertMany(bookings);

    // Create Maintenance Issues
    const maintenanceIssues = await MaintenanceIssue.insertMany([
      {
        roomId: rooms[0]._id,
        reportedBy: users[0]._id,
        issueType: 'AC',
        title: 'Air conditioning not cooling properly',
        description: 'The AC in Conference Room A is running but not cooling the room effectively. Temperature remains at 26°C.',
        priority: 'high',
        status: 'in-progress',
        assignedTo: admin._id
      },
      {
        roomId: rooms[2]._id,
        reportedBy: users[1]._id,
        issueType: 'Projector',
        title: 'Projector display flickering',
        description: 'The projector screen flickers intermittently during presentations.',
        priority: 'medium',
        status: 'open'
      },
      {
        roomId: rooms[1]._id,
        reportedBy: users[2]._id,
        issueType: 'Cleanliness',
        title: 'Room needs cleaning',
        description: 'Whiteboard markers dried out and trash bin is full.',
        priority: 'low',
        status: 'resolved',
        resolvedAt: new Date()
      },
      {
        roomId: rooms[3]._id,
        reportedBy: users[3]._id,
        issueType: 'Network',
        title: 'WiFi connection unstable',
        description: 'WiFi keeps disconnecting during video calls.',
        priority: 'urgent',
        status: 'open'
      },
      {
        roomId: rooms[4]._id,
        reportedBy: users[4]._id,
        issueType: 'Furniture',
        title: 'Chair needs repair',
        description: 'One of the office chairs has a broken wheel.',
        priority: 'medium',
        status: 'resolved',
        resolvedAt: new Date()
      }
    ]);

    // Create Notifications
    const notifications = await Notification.insertMany([
      {
        userId: users[0]._id,
        type: 'BOOKING_APPROVED',
        title: 'Booking Approved',
        message: 'Your booking for Conference Room A has been approved.',
        priority: 'medium',
        isRead: false
      },
      {
        userId: users[1]._id,
        type: 'BOOKING_APPROVED',
        title: 'Booking Approved',
        message: 'Your booking for Conference Room B has been approved.',
        priority: 'medium',
        isRead: true
      },
      {
        userId: users[4]._id,
        type: 'BOOKING_REJECTED',
        title: 'Booking Rejected',
        message: 'Your booking request has been rejected due to scheduling conflict.',
        priority: 'high',
        isRead: false
      },
      {
        userId: users[2]._id,
        type: 'BOOKING_REMINDER',
        title: 'Upcoming Meeting',
        message: 'Your meeting in Board Room starts in 30 minutes.',
        priority: 'high',
        isRead: false
      },
      {
        userId: users[3]._id,
        type: 'SYSTEM_ANNOUNCEMENT',
        title: 'System Maintenance',
        message: 'Scheduled system maintenance on Sunday 2 AM - 4 AM.',
        priority: 'low',
        isRead: true
      }
    ]);

    // Create Audit Logs
    const auditLogs = await AuditLog.insertMany([
      {
        userId: users[0]._id,
        action: 'BOOKING_CREATED',
        entityType: 'Booking',
        entityId: bookings[0]._id,
        details: 'Created booking for Conference Room A'
      },
      {
        userId: admin._id,
        action: 'BOOKING_APPROVED',
        entityType: 'Booking',
        entityId: bookings[0]._id,
        details: 'Approved booking request'
      },
      {
        userId: admin._id,
        action: 'BOOKING_REJECTED',
        entityType: 'Booking',
        entityId: bookings[bookings.length - 1]._id,
        details: 'Rejected booking due to conflict'
      },
      {
        userId: admin._id,
        action: 'ROOM_CREATED',
        entityType: 'Room',
        entityId: rooms[0]._id,
        details: 'Created new conference room'
      },
      {
        userId: users[0]._id,
        action: 'USER_LOGIN',
        entityType: 'User',
        entityId: users[0]._id,
        details: 'User logged in'
      }
    ]);

    console.log('✅ Seed data created successfully!\n');
    console.log('👥 Test Accounts:');
    console.log('   Admin - Email: admin@roomify.com, Password: admin123');
    console.log('   User  - Email: user@roomify.com, Password: user123\n');
    console.log('📊 Data Summary:');
    console.log(`   ${users.length + 1} users created`);
    console.log(`   ${rooms.length} rooms created`);
    console.log(`   ${bookings.length} bookings created`);
    console.log(`   ${maintenanceIssues.length} maintenance issues created`);
    console.log(`   ${notifications.length} notifications created`);
    console.log(`   ${auditLogs.length} audit logs created\n`);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
