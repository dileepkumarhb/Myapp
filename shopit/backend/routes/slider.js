const express = require('express');
const router = express.Router();

const {
    slider,
} = require('../controllers/sliderController')

router.route('/slider').get(slider);

module.exports = router;