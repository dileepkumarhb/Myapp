const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  getCartItems,
  removeCartItems
} = require("../controllers/cartController");
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/addtocart/').post(isAuthenticatedUser,addItemToCart);
router.route("/getCartItems").post(isAuthenticatedUser,getCartItems);
router.route("/removeItem").post(isAuthenticatedUser,removeCartItems);
//new update

module.exports = router;