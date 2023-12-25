const User = require('../models/user');
const passport = require("passport");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // const {name:userName,email,password} = req.body;
    // const {avatar:filename}=req.file;
    
    // for(var i = 0; i<req.body.length; i++){
    //     var userDetails = req.body[i];
    //     console.log(userDetails.avatar.File > 0 ? 'hello' : 'hi')
    // }
    // console.log('keys',keys)
    // console.log('files',req.body);
    // if (req.files && req.files.length > 0) {
    //     console.log('length',req.files.length)
    //     images = req.files.map((file) => {
    //       return { img: file.filename };
    //     });
    //   }
    // console.log('files',req.files,req.file,req.file[0]);
    
   

    // if (req.files.length > 0) {
    //     avatar = avatar.map ((obj, index) => {
    //         console.log('obj',`${req.files[index].filename}_${obj}`)
    //     return { avatar: req.files[index].filename }
    //     })
    //     console.log('avatar',avatar)
    //   }
const {userName, email, password} = req.body;

const {filename} = req.file;

    const user = new User({
        userName,
        email,
        password,
        avatar:filename,
      });
console.log('user',user)
      user.save((error, user) => {
        console.log('details',user)
        if (error) return res.status(400).json({ error });
        if (user) {
          res.status(201).json({ user });
        }
      });

console.log('user',user)

    // sendToken(user, 200, res)

})

// Login User  =>  /a[i/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
     const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
})

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
   
     const user = await User.findOne({ email: req.body.email });
     console.log('email',user.email)
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.file)

//    const {userName,email,_id} = req.body;
   const {filename} = req.file;

    const newUserData = {
        userName: req.body.userName,
        email: req.body.email,
        avatar: filename,
    }
      
    console.log('newUserData',newUserData)
        const user = await User.findByIdAndUpdate(req.body._id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            user
        })
        console.log('newUserData',user)
    })       

// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    console.log( 'req.body',req.body)
    user.password = req.body.password;
console.log( user.password)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    // let images = [];

    // if (req.files && req.files.length > 0) {
    //   images = req.files.map((file) => {
    //     return { img: file.filename };
    //   });
    // }

    const newUserData = {
        name: req.body.userName,
        email: req.body.email,
        // avatar:images,
        role: req.body.role
    }
console.log('newUserData',newUserData)
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    // Remove avatar from cloudinary
    // const image_id = user.avatar.public_id;
    // await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
    })
})
exports.google=catchAsyncErrors(async(req,res)=>{
     passport.authenticate("google", { scope: ["profile"] });
})
exports.facebook=catchAsyncErrors(async(re,res)=>{
    passport.authenticate("facebook", { scope: ["profile"] })
});

exports.callback =catchAsyncErrors(async(re,res)=>{
    passport.authenticate("google", {
        successRedirect: process.env.FRONTEND_URL,
        failureRedirect: "/login/failed",
      })
})
exports.callback =catchAsyncErrors(async(re,res)=>{
    passport.authenticate("facebook", {
        successRedirect: process.env.FRONTEND_URL,
        failureRedirect: "/login/failed",
      })
})

exports.failed=catchAsyncErrors(async(re,res)=>{
    passport.authenticate("failed", {
        successRedirect: process.env.FRONTEND_URL,
        failureRedirect: "/login/failed",
      })
})

// router.get(", (req, res) => {
//     res.status(401).json({
//       success: false,
//       message: "failure",
//     });
//   });
// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})