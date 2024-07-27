const express = require('express');
const { signup, login, logout, resetPassword } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/reset-password', resetPassword);

module.exports = router;
