const mongoose = require('mongoose')

//Create table into DB
const sliderSchema = new mongoose.Schema(
    {
      image: { type: String, required: true },
    },
    {
      timestamps: true, //add date
    }

)

module.exports = mongoose.model('Slider', sliderSchema);