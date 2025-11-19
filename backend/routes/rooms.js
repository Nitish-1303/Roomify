const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { auth, requireRole } = require('../middleware/auth');

router.post('/', auth, requireRole('admin'), roomController.createRoom);
router.get('/', auth, roomController.getRooms);

module.exports = router;
