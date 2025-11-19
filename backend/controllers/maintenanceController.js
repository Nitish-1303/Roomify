const MaintenanceIssue = require('../models/MaintenanceIssue');

// Create maintenance issue
exports.createIssue = async (req, res) => {
  try {
    const { roomId, issueType, title, description, priority } = req.body;

    const issue = new MaintenanceIssue({
      roomId,
      reportedBy: req.user._id,
      issueType,
      title,
      description,
      priority: priority || 'medium'
    });

    await issue.save();
    await issue.populate('roomId reportedBy', 'name location email');

    res.status(201).json(issue);
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all issues
exports.getIssues = async (req, res) => {
  try {
    const { status, roomId, priority } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (roomId) query.roomId = roomId;
    if (priority) query.priority = priority;

    const issues = await MaintenanceIssue.find(query)
      .populate('roomId', 'name location')
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update issue (admin only)
exports.updateIssue = async (req, res) => {
  try {
    const { status, assignedTo, notes, priority } = req.body;
    const issue = await MaintenanceIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    if (status) issue.status = status;
    if (assignedTo) issue.assignedTo = assignedTo;
    if (notes) issue.notes = notes;
    if (priority) issue.priority = priority;

    if (status === 'resolved' && !issue.resolvedAt) {
      issue.resolvedAt = new Date();
    }

    await issue.save();
    await issue.populate('roomId reportedBy assignedTo', 'name location email');

    res.json(issue);
  } catch (error) {
    console.error('Update issue error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get issue statistics
exports.getStats = async (req, res) => {
  try {
    const total = await MaintenanceIssue.countDocuments();
    const open = await MaintenanceIssue.countDocuments({ status: 'open' });
    const inProgress = await MaintenanceIssue.countDocuments({ status: 'in-progress' });
    const resolved = await MaintenanceIssue.countDocuments({ status: 'resolved' });

    const byType = await MaintenanceIssue.aggregate([
      {
        $group: {
          _id: '$issueType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      total,
      open,
      inProgress,
      resolved,
      byType
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
