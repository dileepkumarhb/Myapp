import axios from 'axios';
import {  ADD_TO_CART,
  // REMOVE_CART_ITEM, 
  SAVE_SHIPPING_INFO,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  // ADD_TO_CART_FAIL,
  CART_SAVE_PAYMENT,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL
} from '../constants/cartConstants';
import store from '../store'

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
      const res = await axios.get(`/api/v1/getCartItems`,config);
      // console.log('getCartItems',res)
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: ADD_TO_CART,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemToCart = (product, quantity = product.quantity) => async (dispatch, getState) => {
  console.log('addItemToCart',product)
  const {
    cart: { cartItems },
    auth,
  } = store.getState();
  
  //console.log('action::products', products);
  //const product = action.payload.product;
  //const products = state.products;
  
  // const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
  cartItems[product._id] = {
    ...product,
    quantity,
  };

  if (auth.isAuthenticated) {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const payload = {
      // cartItems: Object.keys(cartItems).map((key, index) => {
      //     return {
      //         quantity: cartItems[key].qty,
      //         product: cartItems[key]._id
      //     }
      // })
      cartItems: [
        {
          product: product._id,
          quantity: parseInt(quantity),
        },
      ],
    };
    console.log('payloaddddddddddddd',payload);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/v1/addtocart`,payload,config);
    console.log('payload with res',res);
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    if (res.status === 201) {
      dispatch(getCartItems());
    }
  } else {
   
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

  console.log("addToCart:", cartItems);

  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: { cartItems },
  });
}



export const removeCartItem = (payload) => {
  //console.log('remove payload',payload)
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/api/v1/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: REMOVE_CART_ITEM_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    console.log("upppppppppp");

    if (auth.authenticate) {
      localStorage.removeItem("cart");
      //dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post(`/api/v1/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export const saveShippingInfo = (data) => async (dispatch) => {

  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  })

  localStorage.setItem('shippingInfo', JSON.stringify(data));
}

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}

export { getCartItems };