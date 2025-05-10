const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  screenId: { type: String, required: true },
  imageUrl: String,
  caption: String,
});

module.exports = mongoose.model('Slide', SlideSchema);
