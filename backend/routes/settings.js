const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('settings');
    res.json(user.settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', auth, [
  body('language').optional().isString().withMessage('Language must be a string'),
  body('timezone').optional().isString().withMessage('Timezone must be a string'),
  body('timeFormat').optional().isIn(['12 Hours', '24 Hours']).withMessage('Time format must be 12 Hours or 24 Hours'),
  body('notifications.message').optional().isBoolean().withMessage('Message notification must be boolean'),
  body('notifications.taskUpdate').optional().isBoolean().withMessage('Task update notification must be boolean'),
  body('notifications.taskDeadline').optional().isBoolean().withMessage('Task deadline notification must be boolean'),
  body('notifications.mentorHelp').optional().isBoolean().withMessage('Mentor help notification must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { language, timezone, timeFormat, notifications } = req.body;
    
    const updateData = {};
    
    if (language !== undefined) updateData['settings.language'] = language;
    if (timezone !== undefined) updateData['settings.timezone'] = timezone;
    if (timeFormat !== undefined) updateData['settings.timeFormat'] = timeFormat;
    
    if (notifications) {
      if (notifications.message !== undefined) updateData['settings.notifications.message'] = notifications.message;
      if (notifications.taskUpdate !== undefined) updateData['settings.notifications.taskUpdate'] = notifications.taskUpdate;
      if (notifications.taskDeadline !== undefined) updateData['settings.notifications.taskDeadline'] = notifications.taskDeadline;
      if (notifications.mentorHelp !== undefined) updateData['settings.notifications.mentorHelp'] = notifications.mentorHelp;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('settings');

    res.json(user.settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;




