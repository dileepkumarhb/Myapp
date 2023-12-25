const Product = require('../models/product')
const Category = require("../models/category");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

//const cloudinary = require('cloudinary');
const slugify = require('slugify')

// create new product => /api/v1/admin/product/new
exports.newProduct = (req, res, next) => {
// console.log('stock',req.body)
// console.log('stock',req)
const { name, price,clrs,check, description, category, stock, seller, createdBy } = req.body;

  console.log('clrs',clrs)

   let chk = JSON.parse(check)
   console.log('chk',chk)
  let images = [];

  if (req.files.length > 0) {

    images = chk.map ((obj, index) => {

        console.log('obj',`${req.files[index].filename}_${obj}`)

    return { img: req.files[index].filename, imgClr:obj }

    })

    // console.log('images',images)

  // }

  // let stockQty = stock
  // if (req.files.length > 0) {
  //   images = req.files.map((file, fileIndex) => {
  //     return chk.map((obj, objIndex) => {
  //       console.log('obj', `${file.filename}_${obj}`)
  //       if (objIndex === fileIndex) {
  //         return { img: `${file.filename}_${obj}` }
  //       }
  //     })
  //   });
  //   console.log('images', images)
  // }

  // if (req.files.length > 0) {
  //   req.files.forEach((file) => {
  //     images =  chk.map (obj => {
  //       console.log('obj',`${file.filename}_${obj}`)
  //     return { img: `${file.filename}_${obj}` }
  //   })
  //   });
  //   console.log('images',images)
  // }
  
  // if (req.files.length > 0) {
  //   images = req.files.map((file) => {
  //   chk.map (obj => {
  //  console.log('obj',`${file.filename}_${obj}`)
  //     return { img: file.filename }
  //   })
  //   console.log('images',images)
  // }




  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    // check:JSON.parse(check),
    stock,
    seller,
    description,
    images,
    category,
    createdBy: req.user._id,
  });

// console.log(product)

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
}
}
//product by slug
exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  // console.log(slug)
  Category.findOne({ slug: slug })
    .select("_id parentId type")
    .exec((error, category) => {
      // console.log(category)
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  const resPerPage = 1;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search().filter().pagination(resPerPage)

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  // const products = await apiFeatures.query;

  // setTimeout(()=>{

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
  })
  //   },2000)
})

// Get all products  => /api/v1/admin/products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  })

})

// Get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  })

})

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }


  res.status(200).json({
    success: true,
    product
  })

})

// Delete Product   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product is deleted.'
  })

})

// Update Product   =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.slug = req.body.slug || product.slug;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.seller = req.body.seller || product.seller;
    // product.stock = req.body.stock || product.stock;
    
    // product.images = req.files.images || product.images
    // if (req.files) {
      let images = [];

      if (req.files && req.files.length > 0) {
        images = req.files.map((file) => {
          return { img: file.filename };
        });
      }

    product.images = images;
    const updateProduct = await product.save();
    // Post.findOneAndUpdate(req.params.id, {$set: updateProduct}, {new: true}).save();
    res.send({
      _id: updateProduct._id,
      name: updateProduct.name,
      slug: updateProduct.slug,
      category: updateProduct.category,
      description: updateProduct.description,
      price: updateProduct.price,
      seller: updateProduct.seller,
      // stock: updateProduct.stock,
      
    });
    // console.log('res',res)
  } else {

    res.status(401).send({ message: "Product not Found!" });

  }
})

// Delete Product   =>   /api/v1/admin/product/:id
// exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler('Product not found', 404));
//     }

//     await product.remove();

//     res.status(200).json({
//         success: true,
//         message: 'Product is deleted.'
//     })

// })

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach(review => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    })

  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  })

})

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  // console.log(product);

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true
  })
})