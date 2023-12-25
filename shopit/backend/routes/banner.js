const express = require('express')
const {
    getBanner,
    createBanner
} = require('../controllers/bannerController')
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


const upload = multer({ storage });

router.route('/banner/:category/:type').get(getBanner)
router.route('/admin/banner/create').post(isAuthenticatedUser,authorizeRoles('admin'),upload.fields([
    { name: 'banners' },
    { name: 'products' }]),createBanner);

module.exports = router;