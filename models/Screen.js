const mongoose = require('mongoose');

const ScreenSchema = new mongoose.Schema({
  screenId: { type: String, required: true, unique: true },
  location: String,
});

module.exports = mongoose.model('Screen', ScreenSchema);
