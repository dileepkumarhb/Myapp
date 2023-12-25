import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom'
//import Layout from "../Layout";
import MetaData from '../Layout/MetaData'
// import Card from "../UI/Card";
// import CartItem from "./CartItem";
import { addItemToCart, getCartItems, removeCartItem } from "../../actions/cartActions";
import { getAllCategory } from '../../actions/categoryActions';
// import PriceDetails from "../PriceDetails";

import "./style.css";
// import { MaterialButton } from "../MaterialUI";

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const { isAuthenticated } = useSelector(state => state.auth)
  const cartItems = cart.cartItems;
 
  // const { loading, error, product } = useSelector(state => state.productDetails)
  //let newProduct = Object.assign( product,{ quantity: quantity });
 
  console.log('cItem111111111111112222222222222222222222222222',cartItems)

  //const [quantity, setQuantity] = useState(cItem)
 // console.log('val1', quantity)
  // console.log('val2',quantity)
  // const [quantity, setQuantity] = useState(cart.cartItems.qty);
  // const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartItems());
    }
  }, [isAuthenticated]);

  const increaseQty = (_id, quantity, stock) => {
   
    const newQty = quantity + 1;
    // console.log('cItem.stock',cItem.stock)
        if (newQty > stock) return;
        console.log('stock',newQty)
    
    const {  name, img, price } = cartItems;
    // const img = product.img;
    dispatch(addItemToCart({ _id, name, price, img,stock, quantity:newQty }));
}

const decreaseQty = (_id, quantity) => {

    const newQty = quantity - 1;

    if (newQty <= 0) return;

    const {  name, img, price } = cartItems;
    // const img = product.img;
    dispatch(addItemToCart({ _id, name, price, img, quantity:newQty }));

}

  const onRemoveCartItem = (_id) => {
    console.log(_id)
    dispatch(removeCartItem({ productId: _id }));
  };
  const checkoutHandler = () => {
    navigate('/checkout')
}
  const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/uploads/${fileName}`;
  }
  return (
    <Fragment>
  
      <MetaData title={'Your Cart'} />
      {cartItems.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> : (
        <Fragment>
           
          <h2 className="mt-5">Your Cart: <b>{ Object.keys(cartItems).reduce((acc,item) => (acc + Number(cartItems[item].quantity)), 0)} items</b></h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">

              {Object.keys(cartItems).map((key, index) => (
             
                <Fragment>
                  <hr />
                  
                  <div className="cart-item" key={cartItems[key].product}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img src={generatePublicUrl(cartItems[key].img)} alt="Laptop" height="90" width="115" />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${cartItems[key].product}`}>{cartItems[key].name}</Link>
                      </div>


                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${cartItems[key].price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQty(cartItems[key], cartItems[key].quantity)}>-</span>

                          <input type="number" className="form-control count d-inline" value={cartItems[key].quantity} readOnly />
                          {/*  */}
                          <span className="btn btn-primary plus" onClick={() => increaseQty(cartItems[key], cartItems[key].quantity,cartItems[key].stock)}>+</span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => onRemoveCartItem(cartItems[key]._id)} ></i>
                      </div>

                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}

            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">{Object.keys(cartItems).reduce((acc, item) => (acc + Number(cartItems[item].quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${Object.keys(cartItems).reduce((acc, item) => acc + cartItems[item].quantity * cartItems[item].price, 0).toFixed(2)}</span></p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button> 
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;