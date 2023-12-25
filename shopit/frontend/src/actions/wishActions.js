import axios from 'axios';
import { ADD_TO_WISH, REMOVE_WISH_ITEM } from '../constants/wishConstants';

export const addItemToWish = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`)
console.log('data img',data)
  dispatch({
    type: ADD_TO_WISH,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images,
      stock: data.product.stock,
      quantity
    }
  })

  localStorage.setItem('wishItems', JSON.stringify(getState().wish.wishItems))
}

export const removeItemFromWish = (id) => async (dispatch, getState) => {

  dispatch({
    type: REMOVE_WISH_ITEM,
    payload: id
  })

  localStorage.clear('wishItems')
}
