const express = require('express');
const router = express.Router();
const { getSlidesByScreenId } = require('../controllers/slideshowController');

router.get('/', getSlidesByScreenId);

module.exports = router;
