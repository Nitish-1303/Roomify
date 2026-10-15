const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/User');
const Room = require('../models/Room');

const register = (body) => request(app).post('/api/auth/register').send(body);
const login = (email, password) => request(app).post('/api/auth/login').send({ email, password });

async function makeUser(role, email = `${role}@example.com`) {
  await User.create({
    name: role,
    email,
    passwordHash: await bcrypt.hash('password123', 10),
    role
  });
  const res = await login(email, 'password123');
  return res.body.token;
}

describe('auth', () => {
  test('register creates a normal user and ignores a requested role', async () => {
    const res = await register({
      name: 'Mallory',
      email: 'mallory@example.com',
      password: 'password123',
      role: 'admin'
    });
    expect(res.status).toBe(201);
    const user = await User.findOne({ email: 'mallory@example.com' });
    expect(user.role).toBe('user');
  });

  test('registered user cannot reach admin endpoints', async () => {
    await register({ name: 'Mallory', email: 'mallory@example.com', password: 'password123', role: 'admin' });
    const { body } = await login('mallory@example.com', 'password123');
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${body.token}`);
    expect(res.status).toBe(403);
  });

  test('register rejects short passwords and bad emails', async () => {
    expect((await register({ name: 'A', email: 'a@example.com', password: 'short' })).status).toBe(400);
    expect((await register({ name: 'A', email: 'nope', password: 'password123' })).status).toBe(400);
  });

  test('login works with the right password and fails with the wrong one', async () => {
    await register({ name: 'A', email: 'a@example.com', password: 'password123' });
    const ok = await login('a@example.com', 'password123');
    expect(ok.status).toBe(200);
    expect(ok.body.token).toBeTruthy();
    expect((await login('a@example.com', 'wrong-password')).status).toBe(401);
  });

  test('protected routes need a token', async () => {
    expect((await request(app).get('/api/rooms')).status).toBe(401);
  });
});

describe('bookings', () => {
  const slot = (startHour, endHour) => ({
    start: new Date(Date.UTC(2030, 0, 1, startHour)).toISOString(),
    end: new Date(Date.UTC(2030, 0, 1, endHour)).toISOString()
  });

  test('overlapping bookings for the same room are rejected', async () => {
    const token = await makeUser('user');
    const room = await Room.create({ name: 'Alpha', capacity: 8, location: 'Floor 1' });
    const book = (s) =>
      request(app).post('/api/bookings').set('Authorization', `Bearer ${token}`).send({ roomId: room._id, ...s });

    expect((await book(slot(9, 11))).status).toBe(201);
    expect((await book(slot(10, 12))).status).toBe(400);
    expect((await book(slot(11, 12))).status).toBe(201);
  });

  test('end before start is rejected', async () => {
    const token = await makeUser('user');
    const room = await Room.create({ name: 'Alpha', capacity: 8, location: 'Floor 1' });
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ roomId: room._id, ...slot(12, 9) });
    expect(res.status).toBe(400);
  });

  test('only admins can approve a booking', async () => {
    const userToken = await makeUser('user');
    const room = await Room.create({ name: 'Alpha', capacity: 8, location: 'Floor 1' });
    const created = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ roomId: room._id, ...slot(9, 10) });
    const id = created.body._id;

    const asUser = await request(app).put(`/api/bookings/${id}/approve`).set('Authorization', `Bearer ${userToken}`);
    expect(asUser.status).toBe(403);

    const adminToken = await makeUser('admin');
    const asAdmin = await request(app).put(`/api/bookings/${id}/approve`).set('Authorization', `Bearer ${adminToken}`);
    expect(asAdmin.status).toBe(200);
  });
});

describe('platform', () => {
  test('health endpoint answers', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });

  test('CORS blocks unknown origins', async () => {
    const res = await request(app).get('/api/health').set('Origin', 'https://evil.example');
    expect(res.status).toBe(403);
  });
});
