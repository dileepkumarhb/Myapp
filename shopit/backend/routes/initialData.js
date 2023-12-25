const express = require('express');
const { isAuthenticatedUser,authorizeRoles  } = require('../middlewares/auth')
const { initialData } = require('../controllers/initialData');
const router = express.Router();


router.route('/admin/initialdata').post(isAuthenticatedUser, authorizeRoles('admin'), initialData);

module.exports = router;