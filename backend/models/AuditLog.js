const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'USER_LOGIN',
      'USER_LOGOUT',
      'BOOKING_CREATED',
      'BOOKING_APPROVED',
      'BOOKING_REJECTED',
      'BOOKING_CANCELLED',
      'ROOM_CREATED',
      'ROOM_UPDATED',
      'ROOM_DELETED'
    ]
  },
  entityType: {
    type: String,
    enum: ['User', 'Booking', 'Room'],
    required: true
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: String
  },
  ipAddress: String,
  userAgent: String
}, { timestamps: true });

// Index for faster queries
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
