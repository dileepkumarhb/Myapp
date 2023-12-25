import axios from 'axios';

import {
  ADD_USER_ORDER_REQUEST,
  ADD_USER_ORDER_SUCCESS,
  ADD_USER_ORDER_FAIL,

  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,

  GET_CUSTOMER_ORDER_REQUEST,
  GET_CUSTOMER_ORDER_SUCCESS,
  GET_CUSTOMER_ORDER_FAIL,

  UPDATE_CUSTOMER_ORDER_REQUEST,
  UPDATE_CUSTOMER_ORDER_SUCCESS,
  UPDATE_CUSTOMER_ORDER_FAIL,

  GET_USER_ORDER_DETAILS_REQUEST,
  GET_USER_ORDER_DETAILS_SUCCESS,
  GET_USER_ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,

  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  

  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,

  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,

  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  RESET_CART,
  CLEAR_ERRORS

} from '../constants/orderConstants';

//add order
export const addOrder = (payload) => async (dispatch, getState) => {

    try {
      const res = await axios.post(`/api/v1/addOrder`, payload);
      dispatch({ type: ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        console.log('add order',res);
        const { order } = res.data;
        dispatch({
          type: RESET_CART,
        });
        dispatch({
          type: ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
        console.log('add order success',payload);
        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: ADD_USER_ORDER_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
}
  
  // Get currently logged in user orders
  export const myOrders = () => async (dispatch) => {
    try {
  
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await axios.get('/api/v1/orders/me')
  
      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data.orders
      })
  
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message
      })
    }
  }

// Get order details   //pay
export const getOrderDetails = (id) => async (dispatch) => {
  console.log('action id',id)
    try {
  
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/order/${id}`)
      console.log('action data',data)
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data.order
      })
  
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message
      })
    }
  }

  export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.put(`/api/v1/orders/${orderId}/deliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
  };

//pay order
export const payOrder = (orderDetails, paymentResult) => async (dispatch, getState) => {
  console.log("aaaaaaaaaaaaaaaaaaaa")
  console.log('orderDetails',orderDetails)
  console.log('paymentResult',paymentResult)
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    // const { userSignin: { userInfo } } = getState();
    const { data } = await axios.put(`/api/v1/payOrder/${orderDetails._id}/pay`, paymentResult, {
      // headers:
      //   { Authorization: 'Bearer ' + userInfo.token }
    });
    console.log('data',data)
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}


// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {

      dispatch({ type: UPDATE_ORDER_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/v1/admin/updateOrder/${id}`, orderData, config)

      dispatch({
          type: UPDATE_ORDER_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: UPDATE_ORDER_FAIL,
          payload: error.response.data.message
      })
  }
}
//order status update
export const orderStatusUpdateOrder = (payload) => {
  
  return async (dispatch) => {
    dispatch({ type: UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.put("/api/v1/admin/order/update", payload);
      console.log('payloadssssssssss',res )
      if (res.status === 201) {
        dispatch({ type: UPDATE_CUSTOMER_ORDER_SUCCESS });
        dispatch(getCustomerOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: UPDATE_CUSTOMER_ORDER_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//orderStatus get customer
export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("/api/v1/admin/order/getCustomerOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: GET_CUSTOMER_ORDER_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {

      dispatch({ type: DELETE_ORDER_REQUEST })

      const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

      dispatch({
          type: DELETE_ORDER_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: DELETE_ORDER_FAIL,
          payload: error.response.data.message
      })
  }
}

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {

      dispatch({ type: ALL_ORDERS_REQUEST });

      const { data } = await axios.get(`/api/v1/admin/orders`)

      dispatch({
          type: ALL_ORDERS_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: ALL_ORDERS_FAIL,
          payload: error.response.data.message
      })
  }
}


export const getOrders = () => {
  console.log('addding')
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/v1/getOrders`);
      console.log('order res',res)
      dispatch({ type: GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { orders } = res.data;
        dispatch({
          type: GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: GET_USER_ORDER_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// single order with complete info and delivery location //pay
export const getOrder = (payload) => {

  return async (dispatch) => {
    try {
      console.log('pay',payload)
      dispatch({ type: GET_USER_ORDER_DETAILS_REQUEST,payload });
      const res = await axios.post(`/api/v1/getOrder`, payload);
      console.log('order details single order',res)
      
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: GET_USER_ORDER_DETAILS_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};



  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }