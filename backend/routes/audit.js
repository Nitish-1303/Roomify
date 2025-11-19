const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', auth, requireRole('admin'), auditController.getAuditLogs);

module.exports = router;
