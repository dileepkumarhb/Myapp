import {
    // ALL_PRODUCTS_REQUEST,
    // ALL_PRODUCTS_SUCCESS,
    // ALL_PRODUCTS_FAIL,
   
    // ADMIN_PRODUCTS_REQUEST,
    // ADMIN_PRODUCTS_SUCCESS,
    // ADMIN_PRODUCTS_FAIL,
    // CLEAR_ERRORS

} from '../constants/productConstants'
import {GET_CUSTOMER_ORDER_SUCCESS} from '../constants/orderConstants'
const initState = {
    orders: [],
  };
  
  export const initialReducers = (state = initState, action) => {
    switch (action.type) {
      case GET_CUSTOMER_ORDER_SUCCESS:
        state = {
          ...state,
          orders: action.payload.orders,
        };
     
        default:
          return state;
    }
    
  };