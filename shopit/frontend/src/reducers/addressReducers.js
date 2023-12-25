import { GET_USER_ADDRESS_REQUEST, 
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_ADDRESS_FAIL,
    ADD_USER_ADDRESS_REQUEST,
    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAIL,
    GET_USER_ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    GET_USER_ORDER_FAILURE,
    GET_USER_ORDER_DETAILS_REQUEST,
    GET_USER_ORDER_DETAILS_SUCCESS,
    GET_USER_ORDER_DETAILS_FAILURE,
    ADD_USER_ORDER_SUCCESS,
    USER_ADDRESS_MAP_CONFIRM
} from "../constants/addressConstants";

const initState = {
  address: [],
  orders: [],
  orderDetails: {},
  error: null,
  loading: false,
  orderFetching: false,
  placedOrderId: null,
};

export const addressReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      break;
    case GET_USER_ADDRESS_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case ADD_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      break;
    case ADD_USER_ADDRESS_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
     break;
    case GET_USER_ORDER_REQUEST:
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    case GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
        orderFetching: false,
      };
      break;
    case GET_USER_ORDER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        orderFetching: false,
      };
      break;
    case GET_USER_ORDER_DETAILS_REQUEST:
      break;
    case GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order,
      };
      break;
    case GET_USER_ORDER_DETAILS_FAILURE:
      break;
    case ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        placedOrderId: action.payload.order._id,
      };
      break;
      // default:
     
  }
  return state;
};

export const userAddressMapReducer = (state = initState.address, action) => {
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload };
    default:
      return state;
  }
};