const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    console.log('📋 Tasks route - User:', req.user?.email);
    console.log('📋 Tasks route - Request headers:', req.headers);
    
    const tasks = await Task.find().sort({ createdAt: -1 });
    console.log('📋 Tasks route - Found tasks:', tasks.length);
    
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('videoUrl').isURL().withMessage('Valid video URL is required'),
  body('videoTitle').trim().isLength({ min: 1 }).withMessage('Video title is required'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('subcategory').trim().isLength({ min: 1 }).withMessage('Subcategory is required'),
  body('duration').trim().isLength({ min: 1 }).withMessage('Duration is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskData = {
      ...req.body,
      createdBy: req.user.id
    };

    const task = new Task(taskData);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the creator of the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is the creator of the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Task = require('../models/Task');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // @route   GET /api/tasks
// // @desc    Get all tasks
// // @access  Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find().sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (error) {
//     console.error('Get tasks error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   GET /api/tasks/:id
// // @desc    Get single task by ID
// // @access  Private
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
    
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
    
//     res.json(task);
//   } catch (error) {
//     console.error('Get task error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   POST /api/tasks
// // @desc    Create a new task
// // @access  Private
// router.post('/', auth, [
//   body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
//   body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
//   body('videoUrl').isURL().withMessage('Valid video URL is required'),
//   body('videoTitle').trim().isLength({ min: 1 }).withMessage('Video title is required'),
//   body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
//   body('subcategory').trim().isLength({ min: 1 }).withMessage('Subcategory is required'),
//   body('duration').trim().isLength({ min: 1 }).withMessage('Duration is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const taskData = {
//       ...req.body,
//       createdBy: req.user.id
//     };

//     const task = new Task(taskData);
//     await task.save();

//     res.status(201).json(task);
//   } catch (error) {
//     console.error('Create task error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   PUT /api/tasks/:id
// // @desc    Update a task
// // @access  Private
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
    
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Check if user is the creator of the task
//     if (task.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     const updatedTask = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );

//     res.json(updatedTask);
//   } catch (error) {
//     console.error('Update task error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   DELETE /api/tasks/:id
// // @desc    Delete a task
// // @access  Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
    
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Check if user is the creator of the task
//     if (task.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     console.error('Delete task error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

