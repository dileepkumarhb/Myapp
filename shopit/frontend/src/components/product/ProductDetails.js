import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader'
// import MetaData from '../Layout/MetaData'
import { BsCheck2 } from "react-icons/bs";
// import { Carousel } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import ListReviews from '../review/ListReviews';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate()

  // const updateFilterValue = (event) => {
  //   let name = event.target.name;
  //   let value = event.target.value;

  //   // return dispatch({ type: UPDATE_FILTERS_VALUE, payload: { name, value } });
  // };

  const { loading, error, product } = useSelector(state => state.productDetails)
  
  console.log('product', product)

  let newProduct = Object.assign(product, { quantity: quantity });

  console.log('newProduct', newProduct)

  const { user } = useSelector(state => state.auth)

  const { error: reviewError, success } = useSelector(state => state.newReview)

  console.log('clr', product.images && product.images[0].imgClr);

  const [toggle, setToggle] = useState(product.images && product.images[0].imgClr);

  const [visible, setVisible] = useState(true);

  const [colorState, setColorState] = useState(
    product.clrs && product.clrs[0].color
  );

  useEffect(() => {
    dispatch(getProductDetails(id))

    if (error) {
      alert.error(error);
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors())
    }

    if (success) {
      alert.success('Reivew posted successfully')
      dispatch({ type: NEW_REVIEW_RESET })
    }

  }, [dispatch, alert, error, reviewError, id, success])

  const addToCart = () => {
    const { _id, name, price, stock, quantity } = newProduct;
    const img = product.images[0].img;
    dispatch(addItemToCart({ _id, name, price, img, stock, quantity }));
    navigate(`/cart`);
    alert.success('Item Added to Cart')
  }

  const increaseQty = () => {
    const count = document.querySelector('.count')
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty)
  }

  const decreaseQty = () => {
    const count = document.querySelector('.count')
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty)
  }

  //rating
  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      })
    })

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue)
          } else {
            star.classList.remove('orange')
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow')
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow')
        }
      })
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', id);

    dispatch(newReview(formData));
  }

  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
  }

  // update the filter values
  // const updateFilterValue = (event) => {
  //   let nameVal = event.target.name;
  //   let value = event.target.value;

  //   return dispatch({ nameVal, value });
  // };

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          {/* <MetaData title={product.name} /> */}
            <div>
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                </div>
                <div>
                <input class="form-check-input" type="checkbox" id="checkboxNoLabel2" value="" aria-label="..."/>
            </div>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            
              {product.images && product.images.map((image, index) => (
                <div className="text">
                  <div onClick={() => { setToggle(image.imgClr); setVisible(false); }} className='flex items-center justify-center'
                    style={{ display: "flex", backgroundColor: `${image.imgClr}`, width: "40px", height: "40px" }}
                  ></div>
                </div>
              ))}

              {product.images && product.images.map((image, index) => (
                <>
                  <div className="main">
                    <div className="img">
                      {visible && image.imgClr === product.images[0].imgClr ? (
                        <Carousel pause='hover'>
                        {
                            // product.images && product.images.map(image => (
                            // <Carousel.Item >
                            // <img className="d-block w-100" src={generatePublicUrl(image.img)} alt={product.title} />
                            // </Carousel.Item>
                            // ))
                         }
                        </Carousel>
                        
                      ) : null}
                      {toggle === image.imgClr ? (
                        <>
                          <img src={generatePublicUrl(image.img)} alt={image.name} key={image.imgClr} className="photo d-block w-100" />
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>
              <hr />
              {product.images && (
                <>
                  <h3 className="text-base font-medium capitalize text-gray-600 mb-2 mt-3">
                    colors
                  </h3>
                  <div className="flex flex-wrap -mx-1">
                    {product.images && product.images.map((color) => (

                      <div
                        key={color.imgClr}
                        onClick={() => setColorState(color.imgClr)}
                        className=" m-1 p-1 cursor-pointer"
                        style={{ border: "gray" }}
                      >
                        <span className='flex items-center justify-center'
                          style={{ display: "flex", backgroundColor: `${color.imgClr}`, width: "40px", height: "40px" }}
                        >
                          {colorState === color.imgClr && (
                            <BsCheck2 size={20} />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                {/*  */}
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline"
                  value={quantity}
                  readOnly />
                {/*  */}
                <span className="btn btn-primary plus" onClick={increaseQty} >+</span>
              </div>
              {/*  */}
              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart} >Add to Cart</button>

              <hr />

              <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
              {/*  */}
              {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4"
                data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings} >
                Submit Your Review
              </button> :
                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
              }

              <div className="row mt-2 mb-5">
                <div className="rating w-50">

                  <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">

                          <ul className="stars" >
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                          </ul>

                          <textarea
                            name="review"
                            id="review" className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          >

                          </textarea>
                          {/*  */}
                          <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}


        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails




