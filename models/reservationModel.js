const mongoose = require('mongoose')


const reservationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },

  seats: { type: Number, required: true },

  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);