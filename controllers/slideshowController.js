const Slide = require('../models/Slide');
const Screen = require('../models/Screen');

const getSlidesByScreenId = async (req, res) => {
  const screenId = req.query.screen_id;
  if (!screenId) return res.status(400).json({ error: "Missing screen_id" });

  const screen = await Screen.findOne({ screenId });
  if (!screen) return res.status(404).json({ error: "Screen not found" });

  const slides = await Slide.find({ screenId });
  if (!slides.length) return res.status(404).json({ error: "No slides found" });

  res.json({ slides });
};

module.exports = { getSlidesByScreenId };
