const express = require('express');
const router = express.Router();

const {
  processPayment,
   sendStripeApi,
   paypalPayment
} = require('../controllers/paymentController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);

router.route('/paypal').get(isAuthenticatedUser, paypalPayment);


module.exports = router;