import React ,{ Fragment} from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';

import { useDispatch, useSelector } from 'react-redux'
// import { useAlert } from 'react-alert'

import {  removeItemFromWish } from '../../actions/wishActions'

export default function Wish() {

// const [quantity, setQuantity] = useState(1)

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishItems } = useSelector(state => state.wish);

  const removeWishItemHandler = (id) => {
    dispatch(removeItemFromWish(id))
  }

  // const increaseQty = (id, quantity, stock) => {
  //   const newQty = quantity + 1;

  //   if (newQty > stock) return;

  //   dispatch(addItemToWish(id, newQty))
  // }

  // const decreaseQty = (id, quantity, stock) => {
  //   const newQty = quantity - 1;

  //   if (newQty <= 0) return;

  //   dispatch(addItemToWish(id, newQty))
  // }

  // const checkoutHandler = () => {
  //   navigate('/cart');
  // }
  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
  }
  wishItems.map(item =>
    console.log('item img',item.image[0].img)
    )
  return (
    <Fragment>
      <MetaData title={'Your Cart'} />

      {wishItems.length === 0 ? <h2 classNameName="mt-5">Your Cart is Empty</h2> : (
        <Fragment>

          <h2 className="mt-5">Your Cart:  <b>{wishItems.length}</b></h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">

              {wishItems.map(item => (
               
                <Fragment key={item.product}>
                  <hr />
                  
                  <div className="cart-item" >
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={generatePublicUrl(item.image[0].img)} alt="Laptop" height="50%" width="50%" />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>


                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.price}</p>
                      </div>

                      {/* <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                          <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                          <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                        </div>
                      </div> */}

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeWishItemHandler(item.product)}></i>
                      </div>

                    </div>
                  </div>
                </Fragment>
              ))}


              <hr />
            </div>

            {/* <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">{wishItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                <p>Est. total:
                  <span className="order-summary-values">
                    ${wishItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}
                  </span>

                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
              </div>
            </div> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}