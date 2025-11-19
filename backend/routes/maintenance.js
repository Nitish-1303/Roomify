const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const { auth, requireRole } = require('../middleware/auth');

router.post('/', auth, maintenanceController.createIssue);
router.get('/', auth, maintenanceController.getIssues);
router.get('/stats', auth, requireRole('admin'), maintenanceController.getStats);
router.put('/:id', auth, requireRole('admin'), maintenanceController.updateIssue);

module.exports = router;
