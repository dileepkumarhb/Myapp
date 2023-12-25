import { createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { cartReducer } from "./reducers/cartReducers";
import { wishReducer } from "./reducers/wishReducers";
import { addressReducer,
 userAddressMapReducer, } from "./reducers/addressReducers";
import { productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer, 
    productReducer,
    reviewReducer,
    productReviewsReducer,
    productListReducer} from './reducers/productReducers';
import {
  allCategoriesReducer,
  categoryReducer,
  newCategoryReducer} from './reducers/categoryReducers'
    import {
        authReducer,
        userReducer,
        forgotPasswordReducer,
        allUsersReducer,
        userDetailsReducer,
      } from "./reducers/userReducers";

      import {
        // newOrderReducer,
        orderPayReducer,
        createOrderReducer,
        myOrdersReducer,
        orderDetailsReducer,
        allOrdersReducer,
        orderReducer,
        getUserOrderDetailsReducer,
        getUserOrderReducer,
        orderDeliverReducer
      } from "./reducers/orderReducers";

      import {
        initialReducers
      } from "./reducers/initialReducers";
      import {
        bannerReducer
      } from "./reducers/bannerReducers";

const reducer = combineReducers({
     initial:initialReducers,
    products:productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    newCategory:newCategoryReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    getUserOrderDetails: getUserOrderDetailsReducer,
    getUserOrder: getUserOrderReducer,
    review: reviewReducer,
    myOrders: myOrdersReducer,
    cart: cartReducer,
    wish:wishReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    allCategories:allCategoriesReducer,
    allUsers: allUsersReducer,
    product: productReducer,
    category:categoryReducer,
    userDetails: userDetailsReducer,
    order: orderReducer,
    createOrder : createOrderReducer,
    productReviews: productReviewsReducer,
    banner:bannerReducer,
    productList:productListReducer,
    userAddress:addressReducer,
    orderPay:orderPayReducer,
    orderDeliver: orderDeliverReducer,
    userAddressMap: userAddressMapReducer,
})


let initialState = {
    // cart: {
    //     cartItems: localStorage.getItem("cartItems")
    //       ? JSON.parse(localStorage.getItem("cartItems"))
    //       : [],
    //       payment: {},
    //     shippingInfo: localStorage.getItem("shippingInfo")
    //       ? JSON.parse(localStorage.getItem("shippingInfo"))
    //       : {},
    //   },
      wish: {
        wishItems: localStorage.getItem("wishItems")
          ? JSON.parse(localStorage.getItem("wishItems"))
          : []
      },
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;