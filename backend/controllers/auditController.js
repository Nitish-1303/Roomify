const AuditLog = require('../models/AuditLog');

// Helper function to create audit log
exports.createAuditLog = async (userId, action, entityType, entityId, details, req) => {
  try {
    await AuditLog.create({
      userId,
      action,
      entityType,
      entityId,
      details,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.headers?.['user-agent']
    });
  } catch (error) {
    console.error('Audit log error:', error);
  }
};

// Get audit logs (admin only)
exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, action, userId } = req.query;
    
    const query = {};
    if (action) query.action = action;
    if (userId) query.userId = userId;

    const logs = await AuditLog.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await AuditLog.countDocuments(query);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
