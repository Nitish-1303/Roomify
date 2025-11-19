const mongoose = require('mongoose');

const maintenanceIssueSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issueType: {
    type: String,
    enum: ['AC', 'Projector', 'Lights', 'Cleanliness', 'Furniture', 'Network', 'Other'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: Date,
  notes: String
}, { timestamps: true });

maintenanceIssueSchema.index({ roomId: 1, status: 1 });
maintenanceIssueSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('MaintenanceIssue', maintenanceIssueSchema);
