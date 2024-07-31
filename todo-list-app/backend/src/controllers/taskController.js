const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, due_date, priority } = req.body;

  try {
    const newTask = new Task({
      user_id: req.user.id,
      title,
      description,
      due_date,
      priority
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user_id.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { title, description, due_date, priority, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task || task.user_id.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;
    task.updated_at = Date.now();

    task = await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task || task.user_id.toString() !== req.user.id) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await Task.deleteOne({ _id: req.params.id });
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Mark a task as completed
exports.completeTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task || task.user_id.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = true;
    task.updated_at = Date.now();

    task = await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
