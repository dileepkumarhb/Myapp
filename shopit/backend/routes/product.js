const express = require('express')
const {
    getProducts,
    getAllProducts,
    getAdminProducts,
    newProduct,
    getProductsBySlug,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,} = require('../controllers/productController')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
  const shortid = require("shortid");
  const path = require("path");
 const multer = require("multer");

 const storage = multer.diskStorage({
    
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    
  cb(null, file.fieldname + '-' + uniqueSuffix)
  },
    
});

 upload = multer({ storage }).array('images');

router.route('/products').get(getProducts);
router.route('/getAllProducts').get(getAllProducts);
router.route('/admin/products').get(getAdminProducts);

router.route("/products/:slug").get(getProductsBySlug);
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload,newProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload,updateProduct)
                                  .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)
// router.route('/products/:slug').get(getProductsBySlug);                                 
                                 
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;