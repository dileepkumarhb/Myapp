const express = require('express')
const router = express.Router();

const {
    addOrder,
    getOrders,
    getOrder,
    orderPayment,
    myOrders,
    getSingleOrder,
    orderDeliver,
    deleteOrderById,
    allOrders,
    updateOrder,
    getCustomerOrders,
    deleteOrder
} = require('../controllers/orderController')

const { isAuthenticatedUser,authorizeRoles  } = require('../middlewares/auth')

router.route('/addOrder').post(isAuthenticatedUser, addOrder);
router.route('/getOrders').get(isAuthenticatedUser, getOrders);
router.route('/getOrder').post(isAuthenticatedUser, getOrder);
router.route('/payOrder/:id/pay').put(isAuthenticatedUser, orderPayment);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/order/:id/deliver').put(isAuthenticatedUser, orderDeliver);
router.route('/admin/order/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrderById);
router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/getCustomerOrders').post(isAuthenticatedUser,authorizeRoles('admin'), getCustomerOrders);
router.route('/admin/order/update')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);


module.exports = router;