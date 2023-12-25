const Product = require('../models/product');
const SliderModel = require('../models/sliderModel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');
const sliderItems = require('../data/sliderItems');
// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        await SliderModel.insertMany(sliderItems)
        console.log('All sliderItems are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()