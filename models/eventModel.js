const mongoose = require('mongoose')
const eventsSchema = new mongoose.Schema({
  totalseats: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  eventname:{type:String, default: null},
  name: { type: String, default: null },
  email: { type: String, default: null },
  bookedAt: { type: Date, default: null },

}, {
  timestamps: true
});

module.exports = mongoose.model('Events', eventsSchema);


