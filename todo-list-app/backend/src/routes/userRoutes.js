const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', auth, getUser);
router.put('/profile', auth, updateUser);

module.exports = router;
