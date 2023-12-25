const express = require('express')
const router = express.Router();
const {
    addAddress,
    getAddress
} = require('../../controllers/addressController')
const { isAuthenticatedUser,authorizeRoles } = require('../../middlewares/auth');

router.post(`/order/update`, requireSignin, authorizeRoles('admin'),adminMiddleware, updateOrders);

router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

router.route('/address/create').post(isAuthenticatedUser,addAddress)
router.route('/getaddress').post(isAuthenticatedUser,getAddress);

module.exports = router;