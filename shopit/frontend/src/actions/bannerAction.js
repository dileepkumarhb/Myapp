import axios from 'axios';

import {

  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,

    CLEAR_ERRORS

} from '../constants/bannerConstants'


// Get product SLIDER
export const createBanner = (form) => {
  // console.log('resssssssss')
  return async dispatch => {
      dispatch({ type: CREATE_BANNER_REQUEST });
      try{
          const res = await axios.post('/api/v1/admin/banner/create', form);
          // console.log('ress',res)
          if(res.status === 201){
              dispatch({
                  type: CREATE_BANNER_SUCCESS,
                  payload: { page: res.data.page }
              });
          }else{
              dispatch({
                  type: CREATE_BANNER_FAIL,
                  payload: { error: res.data.error }
              });
          }
      }catch(error){
          console.log(error)
      }
  }
}


  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }