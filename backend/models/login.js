const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

module.exports = mongoose.model('UserLogin', userLoginSchema);
