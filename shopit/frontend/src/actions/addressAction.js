import axios from 'axios';
import { GET_USER_ADDRESS_REQUEST, 
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_ADDRESS_FAIL,
    ADD_USER_ADDRESS_REQUEST,
    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAIL,
} from "../constants/addressConstants";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/v1/getaddress`);
     
      dispatch({ type:GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type:GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type:GET_USER_ADDRESS_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  console.log('payload',payload)
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post(`/api/v1/address/create`, { payload },config);
      console.log('res',res);
      dispatch({ type:ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        console.log('res',res);
        const {
          address: { address },
        } = res.data;
        dispatch({
          type:ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type:ADD_USER_ADDRESS_FAIL,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};