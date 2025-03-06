const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  savedTrails: {
    type: [
      {
        trailId: String,
        trailName: String,
        location: String,
        difficulty: String,
        length: String,
        trailComments: String,
        savedAt: Date
      }
    ],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);