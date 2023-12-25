const express = require('express')
const router = express.Router();
const {
    addAddress,
    getAddress
} = require('../controllers/addressController')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');



router.route('/address/create').post(isAuthenticatedUser,addAddress)
router.route('/getaddress').post(isAuthenticatedUser,getAddress);

module.exports = router;