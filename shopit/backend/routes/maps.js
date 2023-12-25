const express = require('express');
const router = express.Router();

const {
  mapProcess
} = require('../controllers/mapController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/map').get( mapProcess);

module.exports = router;