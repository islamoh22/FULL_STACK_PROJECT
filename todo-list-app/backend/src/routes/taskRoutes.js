const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);
router.patch('/:id/complete', auth, taskController.completeTask);

module.exports = router;
