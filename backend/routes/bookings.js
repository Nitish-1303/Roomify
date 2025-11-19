const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, requireRole } = require('../middleware/auth');

router.post('/', auth, requireRole('user'), bookingController.createBooking);
router.get('/', auth, bookingController.getBookings);
router.put('/:id/approve', auth, requireRole('admin'), bookingController.approveBooking);
router.put('/:id/reject', auth, requireRole('admin'), bookingController.rejectBooking);

module.exports = router;
