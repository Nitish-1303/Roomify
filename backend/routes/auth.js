const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isString().notEmpty().withMessage('Password required'),
  validate,
  authController.login
);

router.post(
  '/register',
  body('name').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isString().isLength({ min: 8, max: 128 }).withMessage('Password must be 8 to 128 characters'),
  validate,
  authController.register
);

module.exports = router;
