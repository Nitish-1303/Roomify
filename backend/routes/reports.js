const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/bookings', auth, requireRole('admin'), reportsController.exportBookings);
router.get('/rooms', auth, requireRole('admin'), reportsController.exportRoomUtilization);
router.get('/calendar/:roomId', auth, reportsController.getRoomCalendar);

module.exports = router;
