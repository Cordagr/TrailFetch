const mongoose = require('mongoose');

const trailSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  length: { type: Number, required: true }, // Length in miles or kilometers
  description: { type: String },
  created: { type: Date, default: Date.now },
  trailId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Trail', trailSchema);