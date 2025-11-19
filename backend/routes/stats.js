const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/overview', auth, requireRole('admin'), statsController.getOverview);

module.exports = router;
