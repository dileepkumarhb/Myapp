const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order   =>  /api/v1/order/new
exports.addOrder = catchAsyncErrors(async (req, res, next) => {
    // console.log('addOrder')
    Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          req.body.user = req.user._id;
          req.body.orderStatus = [
            {
              type: "ordered",
              date: new Date(),
              isCompleted: true,
            },
            {
              type: "packed",
              isCompleted: false,
            },
            {
              type: "shipped",
              isCompleted: false,
            },
            {
              type: "delivered",
              isCompleted: false,
            },
          ];
          const order = new Order(req.body);
          order.save((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
              res.status(201).json({ order });
            }
          });
        }
      });
})


// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
   Order.findById(req.params.id).populate("items.productId", "_id name images")
   .lean()
   .exec((error, order) => {
     if (error) return res.status(400).json({ error });
     if (order) {
       Address.findOne({
         user: req.user._id,
       }).exec((error, address) => {
         if (error) return res.status(400).json({ error });
         order.address = address.address.find(
           (adr) => adr._id.toString() == order.addressId.toString()
         );
         res.status(200).json({
           order,
         });
       });
     }
   });
})

// Get single order   =>   /api/v1/order/:id
exports.getOrder = catchAsyncErrors(async (req, res, next) => {
    Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name images")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.user._id,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
})


exports.orderPayment = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentStatus = 'completed'
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

exports.orderDeliver= catchAsyncErrors(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

exports.getOrders = (req, res) => {
    Order.find({ user: req.user._id })
      .select("_id paymentStatus paymentType orderStatus items")
      .populate("items.productId", "_id name images")
      .exec((error, orders) => {
        if (error) return res.status(400).json({ error });
        if (orders) {
          res.status(200).json({ orders });
        }
      });
};

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalAmount
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}



exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({ orders });
};



// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrderById = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
      return next(new ErrorHandler('No Order found with this ID', 404))
  }

  await order.remove()

  res.status(200).json({
      success: true
  })
})

