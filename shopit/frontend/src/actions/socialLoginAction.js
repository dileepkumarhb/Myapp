import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

 
} from '../constants/userConstants';

// Login
export const socialGoogle = async(dispatch)=> {
console.log('dileep')
    try {
      dispatch({
        type: LOGIN_REQUEST
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.get('/api/v1/auth/google', config)
  console.log('data',data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user
      })
  
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message
      })
    }
  }