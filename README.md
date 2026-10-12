# Roomify

Conference room booking for teams. Users browse rooms and request time slots, admins approve or reject requests, and everyone gets notifications. Built as a MERN app: a React frontend and an Express + MongoDB API with JWT auth and role-based access.

**Live demo:** __DEMO_URL__ (sample data, nothing is saved). Use "Enter as admin" or "Enter as user" on the login page.

## Features

- Room catalog with capacity, amenities and an availability calendar
- Booking requests with overlap detection, so a room cannot be double booked
- Admin approval flow (approve or reject) with notifications to the requester
- Smart scheduler: suggests free rooms and time slots for a date, duration and group size
- Maintenance tracker: report issues per room, admins triage by status and priority
- Admin analytics: booking volume, status breakdown, peak hours, most booked room
- Audit log of admin actions, user management, and CSV export of bookings and room utilization

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 18 (Create React App), React Router, Tailwind CSS, Recharts, Framer Motion |
| Backend | Node.js 20, Express 4, Mongoose 7 |
| Auth | JWT (24h expiry), bcrypt password hashes, `user` and `admin` roles |
| Security | helmet, CORS allow-list, rate limiting on `/api/auth`, express-validator |
| Tests and CI | Jest, Supertest, mongodb-memory-server, ESLint, GitHub Actions |

## Project structure

```
Roomify/
├── backend/
│   ├── app.js            Express app (middleware and routes)
│   ├── server.js         Startup: env checks, MongoDB connection, listen
│   ├── controllers/      Request handlers
│   ├── middleware/       JWT auth and role checks
│   ├── models/           Mongoose schemas
│   ├── routes/           Route definitions
│   ├── seed.js           Demo data
│   └── tests/            API tests
├── frontend/
│   └── src/
│       ├── api/          Axios client and the demo-mode fake API
│       ├── components/
│       ├── context/      Auth state
│       └── pages/
├── POSTMAN_COLLECTION.json
└── .github/workflows/ci.yml
```

## Run it locally

You need Node.js 20 or newer and a MongoDB instance (local, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
cp .env.example .env      # then set JWT_SECRET and MONGODB_URI
npm install
npm run seed              # loads demo data
npm run dev               # http://localhost:5000
```

`npm run seed` deletes everything in the target database before inserting demo data. Do not point it at a database you care about.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string |
| `JWT_SECRET` | yes | Signing key, at least 16 characters (`openssl rand -hex 32`) |
| `CORS_ORIGIN` | no | Comma-separated browser origins allowed to call the API. Default `http://localhost:3000` |
| `AUTH_RATE_LIMIT` | no | Login and register attempts per IP per 15 minutes. Default 20 |
| `PORT` | no | Default 5000 |

The server refuses to start if `JWT_SECRET` or `MONGODB_URI` is missing.

### 2. Frontend

```bash
cd frontend
npm install
npm start                 # http://localhost:3000
```

Set `REACT_APP_API_URL` if the API is not at `http://localhost:5000/api`.

### Demo mode (no backend)

```bash
cd frontend
REACT_APP_DEMO=true npm start
```

The app runs against built-in sample data. Nothing is saved and a page reload resets it. This is what the live demo uses.

### Demo accounts (after `npm run seed`, and in demo mode)

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@roomify.com` | `admin123` |
| User | `user@roomify.com` | `user123` |

These are sample credentials for local use. Change or remove them before deploying a real instance.

## API overview

All routes are under `/api`. Everything except `/auth/*` and `/health` needs `Authorization: Bearer <token>`.

| Method and path | Access | Description |
| --- | --- | --- |
| `POST /auth/register` | public | Create a user. The role is always `user` |
| `POST /auth/login` | public | Returns a JWT and the user |
| `GET /rooms` | user | List rooms |
| `POST /rooms` | admin | Create a room |
| `GET /bookings` | user | Own bookings (admins see all) |
| `POST /bookings` | user | Request a booking |
| `PUT /bookings/:id/approve`, `PUT /bookings/:id/reject` | admin | Decide a request |
| `GET /smart/suggestions`, `GET /smart/heatmap` | user | Scheduling suggestions and usage heatmap |
| `GET /maintenance`, `POST /maintenance` | user | List and report issues |
| `GET /maintenance/stats`, `PUT /maintenance/:id` | admin | Issue stats and updates |
| `GET /notifications`, `PUT /notifications/:id/read`, `PUT /notifications/read-all` | user | Notifications |
| `GET /stats/overview` | admin | Dashboard numbers |
| `GET /audit` | admin | Audit log |
| `GET /reports/bookings`, `GET /reports/rooms` | admin | CSV exports |
| `GET /reports/calendar/:roomId` | user | Bookings for a room |
| `/users` | admin | List, create, update and delete users |
| `PUT /users/profile/me`, `PUT /users/password/change` | user | Update own profile and password |

A Postman collection is included in `POSTMAN_COLLECTION.json`.

## Tests

```bash
cd backend
npm test
```

The API tests run against an in-memory MongoDB, so no database setup is needed. They cover login and registration (including that a caller cannot pick their own role), role checks on admin routes, double-booking rejection, booking approval and CORS. CI runs lint and tests for the backend and a production build of the frontend on every push and pull request.

## Roadmap

- Email notifications for booking decisions
- Recurring bookings
- Frontend tests

## Author

Yeluru Nitish

## License

MIT
