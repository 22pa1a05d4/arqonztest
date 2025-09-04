const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  videoTitle: {
    type: String,
    required: true
  },
  videoDuration: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  studentsInvolved: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    required: true
  },
  assessmentPoints: [{
    point: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  assignedAssignments: [{
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  }],
  studentInfo: {
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    }
  },
  fileSubmission: {
    lastModified: {
      type: Date,
      default: Date.now
    },
    submittedFiles: [{
      filename: String,
      originalName: String,
      path: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);

