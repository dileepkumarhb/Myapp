const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process
// exports.mapProcess = catchAsyncErrors(async (req, res, next) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: 'usd',
//     metadata: { integration_check: 'accepts_a_payment' }
//   });

//   res.status(200).json({
//     success: true,
//     client_secret: paymentIntent.client_secret
//   })
// })


//Send Stripe API Key => /api/v1/stripeapi
// exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {

//   res.status(200).json({
//     stripeApiKey: process.env.STRIPE_API_KEY
//   })
// })

// Process stripe payments => /api/v1/payment/process
exports.mapProcess = catchAsyncErrors(async (req, res, next) => {
 const result = res.send(process.env.GOOGLE_API_KEY);
//  console.log(result)
});

