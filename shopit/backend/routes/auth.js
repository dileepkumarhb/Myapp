const express = require('express');
const router = express.Router();
const passport = require("passport");

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    logout,
    google,
    facebook,
    callback,
    failed
} = require('../controllers/authController');

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
    //  res = req.file
    //  console.log('res',res)
  }, 
  limits: {
    fileSize: 9000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


const upload = multer({ storage }).single('avatar');

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');

router.route('/register').post(upload,registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)


router.route('/me').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update/:id').put(isAuthenticatedUser,upload,updateProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
router.route("/auth/google").get( passport.authenticate("google", { scope: ["profile","email"] }));

// router.route("/auth/google/callback").get( passport.authenticate("google"));

router.get("/facebook").get(facebook)
router.route('/logout').get(logout)
router.route( "/google/callback").get(callback)
router.route( "/google/facebook").get(callback)
router.route("/login/failed").get(failed)

module.exports = router;