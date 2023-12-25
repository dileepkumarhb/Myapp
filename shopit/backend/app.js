const express = require('express')
const app = express();
const cors = require("cors");
const passportSetup = require("./passport");
var session = require('express-session')
const cookieSession = require('cookie-session')
const passport = require("passport");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/errors')
// const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
// const fileupload = require('express-fileupload'); 
const multer = require("multer");
const path = require("path");
app.use(express.json());
//Use session
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
      maxAge:30 * 24 * 60 * 60 *1000,
      keys:['kiyiuyiuyiuyuiyiyiy']
  })
)

app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser())
// app.use(fileUpload())
// app.use(fileupload({useTempFiles: true}))
// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })
// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');
const slider = require('./routes/slider');
const categoryRoutes = require("./routes/category");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/initialData");
const bannerRoutes = require("./routes/banner");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const mapsRoutes = require("./routes/maps");

app.use('uploads', express.static(__dirname+"./public"))
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use("/api/v1", mapsRoutes)
app.use('/api/v1', order)
app.use('/api/v1', slider)
app.use('/api/v1', categoryRoutes)
app.use('/api/v1', cartRoutes)
app.use('/api/v1', initialDataRoutes)
app.use('/api/v1', bannerRoutes)
app.use('/api/v1', addressRoutes)
app.use("/api/v1", orderRoutes)

app.get("/auth/google/callback",passport.authenticate("google"));
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app