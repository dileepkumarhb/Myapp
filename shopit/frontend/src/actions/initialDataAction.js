import axios from 'axios';
import {
    // GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    // GET_ALL_CATEGORIES_FAIL,
  } from "../constants/categoryConstants";
  import {
    // ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    // ALL_PRODUCTS_FAIL,
  } from "../constants/productConstants";
  import {
    GET_CUSTOMER_ORDER_SUCCESS
  } from "../constants/orderConstants"
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/api/v1/admin/initialdata`);
      if (res.status === 200) {
        const { categories, products, orders } = res.data;
        dispatch({
          type: GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        dispatch({
          type: GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      }
      console.log(res);
    };
  };