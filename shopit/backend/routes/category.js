const express = require('express')
//const {upload} = require('../helpers/filehelper');
const {addCategory,getCategories,getAdminCategory,updateCategories,deleteCategories} = require("../controllers/catController");
  const { isAuthenticatedUser,authorizeRoles  } = require('../middlewares/auth')
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
  
  router.route("/admin/category/create").post(isAuthenticatedUser,authorizeRoles('admin'),upload.single("categoryImage"),addCategory);
  router.route("/admin/category").get(isAuthenticatedUser,authorizeRoles('admin'),getCategories);
  router.route("/admin/category/update").post(isAuthenticatedUser,authorizeRoles('admin'),upload.array("categoryImage"),updateCategories);
  router.route("/admin/category/delete").post(isAuthenticatedUser,authorizeRoles('admin'),deleteCategories);

  module.exports = router;