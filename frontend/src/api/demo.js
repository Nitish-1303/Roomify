// In-memory fake API used when REACT_APP_DEMO=true.
// Nothing is saved anywhere: a page reload resets all data.

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const at = (dayOffset, hour) => {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return new Date(d.getTime() + dayOffset * DAY).toISOString();
};

let seq = 1000;
const newId = () => `demo-${seq++}`;

const users = [
  { _id: 'u-admin', name: 'Admin User', email: 'admin@roomify.com', role: 'admin', password: 'admin123' },
  { _id: 'u-1', name: 'Priya Sharma', email: 'user@roomify.com', role: 'user', password: 'user123' },
  { _id: 'u-2', name: 'Arjun Rao', email: 'arjun@example.com', role: 'user', password: 'demo' },
  { _id: 'u-3', name: 'Meera Iyer', email: 'meera@example.com', role: 'user', password: 'demo' }
].map((u) => ({ ...u, createdAt: at(-30, 10) }));

const amenities = (extra = {}) => ({
  projector: true,
  avSystem: true,
  whiteboard: true,
  ac: true,
  videoConference: false,
  smartBoard: false,
  ...extra
});

const rooms = [
  { _id: 'r-1', name: 'Aurora', location: 'Floor 1, East Wing', capacity: 8, amenities: amenities(), seatingType: 'Boardroom', description: 'Compact boardroom for team syncs.' },
  { _id: 'r-2', name: 'Borealis', location: 'Floor 1, West Wing', capacity: 20, amenities: amenities({ videoConference: true }), seatingType: 'Theater', description: 'Large room with video conferencing.' },
  { _id: 'r-3', name: 'Cascade', location: 'Floor 2, East Wing', capacity: 12, amenities: amenities({ smartBoard: true }), seatingType: 'Classroom', description: 'Classroom layout with a smart board.' },
  { _id: 'r-4', name: 'Delta', location: 'Floor 2, West Wing', capacity: 6, amenities: amenities({ projector: false }), seatingType: 'U-Shape', description: 'Small room for interviews and 1:1s.' },
  { _id: 'r-5', name: 'Everest', location: 'Floor 3', capacity: 30, amenities: amenities({ videoConference: true, smartBoard: true }), seatingType: 'Banquet', description: 'Town hall and workshop space.' }
].map((r) => ({ ...r, photos: [], createdAt: at(-30, 10) }));

const bookings = [
  { _id: 'b-1', userId: 'u-1', roomId: 'r-1', start: at(0, 10), end: at(0, 11), status: 'approved' },
  { _id: 'b-2', userId: 'u-2', roomId: 'r-2', start: at(0, 14), end: at(0, 16), status: 'pending' },
  { _id: 'b-3', userId: 'u-3', roomId: 'r-3', start: at(1, 9), end: at(1, 10), status: 'approved' },
  { _id: 'b-4', userId: 'u-1', roomId: 'r-5', start: at(2, 15), end: at(2, 17), status: 'pending' },
  { _id: 'b-5', userId: 'u-2', roomId: 'r-1', start: at(-1, 11), end: at(-1, 12), status: 'rejected' },
  { _id: 'b-6', userId: 'u-3', roomId: 'r-4', start: at(3, 13), end: at(3, 14), status: 'approved' }
].map((b) => ({ ...b, createdAt: at(-2, 9) }));

const issues = [
  { _id: 'm-1', roomId: 'r-2', reportedBy: 'u-1', issueType: 'Projector', title: 'Projector flickers', description: 'Image flickers after 10 minutes.', priority: 'high', status: 'open', createdAt: at(-1, 9) },
  { _id: 'm-2', roomId: 'r-4', reportedBy: 'u-3', issueType: 'AC', title: 'AC too loud', description: 'Rattling noise from the vent.', priority: 'medium', status: 'in-progress', createdAt: at(-3, 15) },
  { _id: 'm-3', roomId: 'r-1', reportedBy: 'u-2', issueType: 'Cleanliness', title: 'Whiteboard not cleaned', description: 'Old notes on the board.', priority: 'low', status: 'resolved', createdAt: at(-5, 12) }
];

const notifications = [
  { _id: 'n-1', userId: 'u-1', type: 'booking_approved', title: 'Booking approved', message: 'Your booking for Aurora was approved.', isRead: false, priority: 'medium', createdAt: at(0, 8) },
  { _id: 'n-2', userId: 'u-1', type: 'system', title: 'Welcome to Roomify', message: 'This is a demo. Nothing you do here is saved.', isRead: false, priority: 'high', createdAt: at(-1, 8) },
  { _id: 'n-3', userId: 'u-admin', type: 'booking_request', title: 'New booking request', message: 'Arjun Rao requested Borealis.', isRead: false, priority: 'high', createdAt: at(0, 7) }
];

const auditLogs = [
  { _id: 'a-1', userId: 'u-admin', action: 'approve', entityType: 'Booking', details: 'Approved booking for Aurora', createdAt: at(0, 8) },
  { _id: 'a-2', userId: 'u-admin', action: 'reject', entityType: 'Booking', details: 'Rejected booking for Aurora', createdAt: at(-1, 12) },
  { _id: 'a-3', userId: 'u-admin', action: 'create', entityType: 'User', details: 'Created user Meera Iyer', createdAt: at(-4, 10) }
];

const fail = (status, error) => {
  const err = new Error(error);
  err.response = { status, data: { error } };
  return err;
};

const publicUser = ({ password, ...rest }) => rest;
const userById = (id) => users.find((u) => u._id === id);
const roomById = (id) => rooms.find((r) => r._id === id);
const slim = (u) => u && { _id: u._id, name: u.name, email: u.email };

const withRefs = (b) => ({
  ...b,
  roomId: roomById(b.roomId),
  userId: slim(userById(b.userId))
});

const parseBody = (config) => {
  if (!config.data) return {};
  try {
    return typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
  } catch {
    return {};
  }
};

const currentUser = (config) => {
  const header = config.headers && (config.headers.Authorization || config.headers.get?.('Authorization'));
  const token = String(header || '').replace('Bearer ', '');
  const user = userById(token.replace('demo-token-', ''));
  if (!user) throw fail(401, 'Authentication required');
  return user;
};

const requireAdmin = (user) => {
  if (user.role !== 'admin') throw fail(403, 'Access denied');
};

const readOnly = () => fail(403, 'Not available in the demo');

function handle(config) {
  const method = (config.method || 'get').toLowerCase();
  const path = (config.url || '').replace(/^https?:\/\/[^/]+/, '').replace(/^\/api/, '').split('?')[0];
  const body = parseBody(config);
  const params = config.params || {};

  if (method === 'post' && path === '/auth/login') {
    const user = users.find((u) => u.email === String(body.email || '').toLowerCase() && u.password === body.password);
    if (!user) throw fail(401, 'Invalid credentials');
    return { token: `demo-token-${user._id}`, user: publicUser(user) };
  }

  const me = currentUser(config);

  if (method === 'get' && path === '/rooms') return rooms;

  if (method === 'get' && path === '/bookings') {
    const list = me.role === 'admin' ? bookings : bookings.filter((b) => b.userId === me._id);
    return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(withRefs);
  }

  if (method === 'post' && path === '/bookings') {
    const start = new Date(body.start);
    const end = new Date(body.end);
    if (!body.roomId || !body.start || !body.end) throw fail(400, 'All fields required');
    if (end <= start) throw fail(400, 'End time must be after start time');
    if (!roomById(body.roomId)) throw fail(404, 'Room not found');
    const clash = bookings.some(
      (b) => b.roomId === body.roomId && b.status !== 'rejected' && new Date(b.start) < end && new Date(b.end) > start
    );
    if (clash) throw fail(400, 'Room already booked for this time slot');
    const booking = {
      _id: newId(),
      userId: me._id,
      roomId: body.roomId,
      start: start.toISOString(),
      end: end.toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    bookings.push(booking);
    return withRefs(booking);
  }

  const decision = path.match(/^\/bookings\/([^/]+)\/(approve|reject)$/);
  if (method === 'put' && decision) {
    requireAdmin(me);
    const booking = bookings.find((b) => b._id === decision[1]);
    if (!booking) throw fail(404, 'Booking not found');
    booking.status = decision[2] === 'approve' ? 'approved' : 'rejected';
    return withRefs(booking);
  }

  if (method === 'get' && path === '/stats/overview') {
    requireAdmin(me);
    const statusCounts = { pending: 0, approved: 0, rejected: 0 };
    bookings.forEach((b) => { statusCounts[b.status] += 1; });
    const perRoom = {};
    bookings.forEach((b) => { perRoom[b.roomId] = (perRoom[b.roomId] || 0) + 1; });
    const [topId, topCount] = Object.entries(perRoom).sort((a, b) => b[1] - a[1])[0];
    const perHour = {};
    bookings.forEach((b) => {
      const h = new Date(b.start).getHours();
      perHour[h] = (perHour[h] || 0) + 1;
    });
    const trend = [];
    for (let i = 6; i >= 0; i -= 1) {
      trend.push({ _id: new Date(Date.now() - i * DAY).toISOString().slice(0, 10), count: [2, 1, 3, 2, 4, 1, 2][6 - i] });
    }
    return {
      totalBookingsThisMonth: bookings.length,
      statusCounts,
      mostBookedRoom: { _id: topId, count: topCount, room: roomById(topId) },
      peakHours: Object.entries(perHour).map(([h, c]) => ({ _id: Number(h), count: c })).sort((a, b) => b.count - a.count).slice(0, 5),
      bookingsTrend: trend,
      totalUsers: users.length,
      totalRooms: rooms.length,
      pendingApprovals: statusCounts.pending
    };
  }

  if (method === 'get' && path === '/audit') {
    requireAdmin(me);
    const filtered = params.action ? auditLogs.filter((l) => l.action === params.action) : auditLogs;
    return {
      logs: filtered.map((l) => ({ ...l, userId: slim(userById(l.userId)) })),
      totalPages: 1,
      currentPage: 1,
      total: filtered.length
    };
  }

  if (method === 'get' && path === '/users') {
    requireAdmin(me);
    return users.map(publicUser);
  }
  if (path.startsWith('/users') && method !== 'get') {
    if (path === '/users/profile/me') {
      me.name = body.name || me.name;
      me.email = body.email || me.email;
      return { message: 'Profile updated (demo only)', user: publicUser(me) };
    }
    throw readOnly();
  }

  if (method === 'get' && path === '/notifications') {
    const mine = notifications.filter((n) => n.userId === me._id);
    return {
      notifications: mine,
      totalPages: 1,
      currentPage: 1,
      total: mine.length,
      unreadCount: mine.filter((n) => !n.isRead).length
    };
  }
  if (method === 'put' && path === '/notifications/read-all') {
    notifications.forEach((n) => { if (n.userId === me._id) n.isRead = true; });
    return { message: 'All notifications marked as read' };
  }
  const read = path.match(/^\/notifications\/([^/]+)\/read$/);
  if (method === 'put' && read) {
    const n = notifications.find((x) => x._id === read[1]);
    if (n) n.isRead = true;
    return { message: 'Notification marked as read' };
  }

  if (method === 'get' && path === '/maintenance') {
    return issues.map((i) => ({ ...i, roomId: roomById(i.roomId), reportedBy: slim(userById(i.reportedBy)) }));
  }
  if (method === 'get' && path === '/maintenance/stats') {
    requireAdmin(me);
    const count = (s) => issues.filter((i) => i.status === s).length;
    const types = {};
    issues.forEach((i) => { types[i.issueType] = (types[i.issueType] || 0) + 1; });
    return {
      total: issues.length,
      open: count('open'),
      inProgress: count('in-progress'),
      resolved: count('resolved'),
      byType: Object.entries(types).map(([t, c]) => ({ _id: t, count: c }))
    };
  }
  if (method === 'post' && path === '/maintenance') {
    const issue = { _id: newId(), reportedBy: me._id, status: 'open', priority: 'medium', ...body, createdAt: new Date().toISOString() };
    issues.unshift(issue);
    return issue;
  }
  const upd = path.match(/^\/maintenance\/([^/]+)$/);
  if (method === 'put' && upd) {
    requireAdmin(me);
    const issue = issues.find((i) => i._id === upd[1]);
    if (!issue) throw fail(404, 'Issue not found');
    Object.assign(issue, body);
    return issue;
  }

  if (method === 'get' && path === '/smart/suggestions') {
    const duration = parseInt(params.duration || 60, 10);
    const capacity = parseInt(params.capacity || 1, 10);
    const day = params.date ? new Date(`${params.date}T00:00:00`) : new Date();
    const out = [];
    rooms.filter((r) => r.capacity >= capacity).forEach((room) => {
      [9, 11, 14, 16].forEach((hour) => {
        const start = new Date(day);
        start.setHours(hour, 0, 0, 0);
        const end = new Date(start.getTime() + duration * 60 * 1000);
        const clash = bookings.some(
          (b) => b.roomId === room._id && b.status !== 'rejected' && new Date(b.start) < end && new Date(b.end) > start
        );
        if (!clash) {
          out.push({
            room: { id: room._id, name: room.name, location: room.location, capacity: room.capacity, amenities: room.amenities },
            timeSlot: { start: start.toISOString(), end: end.toISOString(), duration },
            score: 100 - Math.abs(room.capacity - capacity) - (hour === 9 || hour === 14 ? 0 : 5)
          });
        }
      });
    });
    return out.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  if (path.startsWith('/reports')) {
    requireAdmin(me);
    return 'Reports are not available in the demo.\n';
  }

  if (method !== 'get') throw readOnly();
  throw fail(404, 'Not found in demo');
}

export default function demoAdapter(config) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = handle(config);
        resolve({ data: JSON.parse(JSON.stringify(data)), status: 200, statusText: 'OK', headers: {}, config });
      } catch (err) {
        if (err.response) err.response.config = config;
        reject(err);
      }
    }, 120);
  });
}
