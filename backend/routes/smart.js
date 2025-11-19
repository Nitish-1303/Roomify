const express = require('express');
const router = express.Router();
const smartSchedulerController = require('../controllers/smartSchedulerController');
const { auth } = require('../middleware/auth');

router.get('/suggestions', auth, smartSchedulerController.getSuggestions);
router.get('/heatmap', auth, smartSchedulerController.getHeatmap);

module.exports = router;
