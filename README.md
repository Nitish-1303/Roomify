# Roomify - Conference Room Booking System

A full-stack MERN application for managing conference room bookings with JWT authentication and role-based access control.

## Features

### Core Features
- **Authentication**: JWT-based login system with animated character UI
- **Role-Based Access Control**: User and Admin roles with different permissions
- **Room Management**: Admins can create rooms, all users can view them
- **Booking System**: Users can request bookings, admins can approve/reject
- **Overlap Validation**: Prevents double-booking of rooms
- **Responsive UI**: Mobile and desktop-friendly interface with TailwindCSS

### Enterprise Features (Admin Only)
- **📊 Analytics Dashboard**: 
  - Real-time booking statistics
  - Pie charts for booking status distribution
  - Bar charts for peak usage hours
  - Line charts for booking trends
  - Most booked room insights
  
- **👥 User Management**: 
  - Full CRUD operations for users
  - Create/Edit/Delete users
  - Assign roles (User/Admin)
  - View user booking history
  - User statistics dashboard
  
- **📄 Reports & Export**: 
  - Export bookings to CSV
  - Export room utilization reports
  - Real-time data export
  - Compatible with Excel/Google Sheets

### Smart Features (All Users)
- **✨ Smart Scheduler (AI-Powered)**: 
  - Intelligent meeting time suggestions
  - Room availability analysis
  - Optimal time slot recommendations
  - One-click quick booking
  - Capacity-based filtering
  - Score-based ranking system
  
- **🔧 Maintenance System**: 
  - Report facility issues
  - Track issue status (Open/In Progress/Resolved)
  - Priority levels (Low/Medium/High/Urgent)
  - Issue types (AC, Projector, Lights, etc.)
  - Admin assignment and resolution
  - Statistics dashboard

### User Features
- **🔔 Notifications Center**: 
  - Booking approval/rejection notifications
  - System announcements
  - Unread count badge
  - Mark as read functionality
  
- **👤 Profile & Settings**: 
  - Update personal information
  - Change password
  - View account details
  - Role display
  
- **🏢 Room Amenities**: 
  - Projector availability
  - AV system details
  - Whiteboard, AC, Video conferencing
  - Seating type information

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React.js with Hooks
- React Router for navigation
- Context API for state management
- TailwindCSS for styling
- Axios for API calls

## Prerequisites

- Node.js (v14+)
- MongoDB (running locally or connection string)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd roomify
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (or use the existing one):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roomify
JWT_SECRET=roomify_secret_key_2024
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:
```bash
mongod
```

### 2. Seed the Database

From the `backend` directory:
```bash
npm run seed
```

This creates:
- Admin account: `admin@roomify.com` / `admin123`
- User account: `user@roomify.com` / `user123`
- 5 sample conference rooms

### 3. Start Backend Server

From the `backend` directory:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 4. Start Frontend

From the `frontend` directory:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## 🎯 Demo Walkthrough

### Login as User (Regular Employee)

1. Open `http://localhost:3000` in your browser
2. Use these credentials:
   - **Email:** `user@roomify.com`
   - **Password:** `user123`
3. Click "Login"

**What you can do as a User:**
- ✅ View all available conference rooms
- ✅ Click "Book Room" on any room card
- ✅ Select start and end date/time
- ✅ Submit booking request (status: pending)
- ✅ Navigate to "Bookings" to see your requests
- ✅ View booking status (pending/approved/rejected)

### Login as Admin (Manager)

1. Logout from user account (click "Logout" in navbar)
2. Use these credentials:
   - **Email:** `admin@roomify.com`
   - **Password:** `admin123`
3. Click "Login"

**What you can do as an Admin:**
- ✅ View all conference rooms (no booking button - admins manage, not book)
- ✅ Navigate to "Bookings" to see ALL user requests
- ✅ See which user requested each booking
- ✅ Click "Approve" to approve pending bookings
- ✅ Click "Reject" to reject pending bookings
- ✅ Status updates in real-time

### Testing the Booking Flow

**Complete Demo Scenario:**

1. **Login as User** (`user@roomify.com` / `user123`)
2. Go to "Rooms" page
3. Click "Book Room" on "Conference Room A"
4. Select:
   - Start: Tomorrow at 10:00 AM
   - End: Tomorrow at 11:00 AM
5. Click "Submit Request"
6. Go to "Bookings" - you'll see your request with status "pending"
7. **Logout**

8. **Login as Admin** (`admin@roomify.com` / `admin123`)
9. Go to "Bookings" page
10. You'll see the user's booking request
11. Click "Approve" - status changes to "approved"
12. **Logout**

13. **Login as User again**
14. Go to "Bookings" - your booking is now "approved"! ✅

### Testing Overlap Prevention

1. Login as User
2. Book "Conference Room A" from 2:00 PM - 3:00 PM
3. Try to book the same room from 2:30 PM - 3:30 PM
4. You'll get an error: "Room already booked for this time slot"
5. This prevents double-booking! 🎉

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user

### Rooms (Protected)
- `GET /api/rooms` - List all rooms (all authenticated users)
- `POST /api/rooms` - Create room (admin only)

### Bookings (Protected)
- `GET /api/bookings` - Get bookings (users see own, admins see all)
- `POST /api/bookings` - Create booking request (user only)
- `PUT /api/bookings/:id/approve` - Approve booking (admin only)
- `PUT /api/bookings/:id/reject` - Reject booking (admin only)

## Testing with cURL

### Login as User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"user@roomify.com\",\"password\":\"user123\"}"
```

### Login as Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@roomify.com\",\"password\":\"admin123\"}"
```

### Get Rooms (replace TOKEN)
```bash
curl http://localhost:5000/api/rooms \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Booking (replace TOKEN and ROOM_ID)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"roomId\":\"ROOM_ID\",\"start\":\"2024-12-01T10:00:00\",\"end\":\"2024-12-01T11:00:00\"}"
```

### Approve Booking (admin only, replace TOKEN and BOOKING_ID)
```bash
curl -X PUT http://localhost:5000/api/bookings/BOOKING_ID/approve \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure

```
roomify/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── server.js          # Express app
│   └── seed.js            # Database seeding
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/           # Axios configuration
│       ├── components/    # Reusable components
│       ├── context/       # Auth context
│       ├── pages/         # Page components
│       └── App.js         # Main app component
└── README.md
```

## User Roles

### User
- View all conference rooms
- Create booking requests
- View own bookings
- See booking status (pending/approved/rejected)

### Admin
- View all conference rooms
- Create new conference rooms
- View all bookings from all users
- Approve or reject booking requests

## Features Implemented

✅ JWT-based authentication
✅ Role-based authorization (user/admin)
✅ Room CRUD operations
✅ Booking request system
✅ Booking approval/rejection workflow
✅ Overlap validation for bookings
✅ Responsive UI with TailwindCSS
✅ Protected routes on frontend
✅ Error handling with proper status codes
✅ Database seeding script
✅ Clean code structure with separation of concerns

## Security Features

- Passwords hashed with bcryptjs
- JWT tokens for stateless authentication
- Protected API routes with middleware
- Role-based access control
- Input validation on backend

## Future Enhancements

- Email notifications for booking status
- Calendar view for bookings
- Room availability search
- Booking history and analytics
- User profile management
- Admin dashboard with statistics

## License

MIT
