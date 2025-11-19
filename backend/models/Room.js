const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  amenities: {
    projector: { type: Boolean, default: true },
    avSystem: { type: Boolean, default: true },
    whiteboard: { type: Boolean, default: true },
    ac: { type: Boolean, default: true },
    videoConference: { type: Boolean, default: false },
    smartBoard: { type: Boolean, default: false }
  },
  seatingType: {
    type: String,
    enum: ['Theater', 'Classroom', 'Boardroom', 'U-Shape', 'Banquet'],
    default: 'Boardroom'
  },
  description: {
    type: String,
    default: ''
  },
  photos: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
