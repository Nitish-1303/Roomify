const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, requireRole } = require('../middleware/auth');

// Admin routes
router.get('/', auth, requireRole('admin'), userController.getAllUsers);
router.post('/', auth, requireRole('admin'), userController.createUser);
router.get('/:id', auth, requireRole('admin'), userController.getUserById);
router.put('/:id', auth, requireRole('admin'), userController.updateUser);
router.delete('/:id', auth, requireRole('admin'), userController.deleteUser);
router.get('/:id/bookings', auth, requireRole('admin'), userController.getUserBookings);

// User routes
router.put('/profile/me', auth, userController.updateProfile);
router.put('/password/change', auth, userController.changePassword);

module.exports = router;
