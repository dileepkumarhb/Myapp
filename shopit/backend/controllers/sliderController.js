const Slider = require('../models/sliderModel.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

exports.slider = catchAsyncErrors( async (req, res, next) => {
  const slider = await Slider.find();
  res.send(slider);
});
