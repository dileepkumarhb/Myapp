import {
  ADD_USER_ORDER_REQUEST,
  ADD_USER_ORDER_SUCCESS,
  ADD_USER_ORDER_FAIL,

  GET_USER_ORDER_REQUEST,
  GET_USER_ORDER_SUCCESS,
  GET_USER_ORDER_FAIL,

  GET_USER_ORDER_DETAILS_REQUEST,
  GET_USER_ORDER_DETAILS_SUCCESS,
  GET_USER_ORDER_DETAILS_FAIL,
    
  ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    CLEAR_ERRORS,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
   
  
  } from '../constants/orderConstants';
  const initState = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    loading: false,
    orderFetching: false,
    placedOrderId: null,
  };
  export const createOrderReducer = (state = initState, action) => {
    switch (action.type) {
      case ADD_USER_ORDER_REQUEST:
        return {
          ...state,
          loading: true
        }
  
        case ADD_USER_ORDER_SUCCESS:
          return {
            ...state,
            placedOrderId: action.payload.order._id,
          };
          
  
      case ADD_USER_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload
        }
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
  
      default:
        return state;
    }
  }

  export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
  
      case MY_ORDERS_REQUEST:
        return {
          loading: true
        }
  
      case MY_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload
        }
      case MY_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
  
      default:
        return state
    }
  }

  export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

  export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
  
      case ALL_ORDERS_REQUEST:
        return {
          loading: true
        }
  
      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload.orders,
          totalAmount: action.payload.totalAmount
        }
      case ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }
  
      default:
        return state
    }
  }

  //GET USER ORDER 
  export const getUserOrderReducer = (state = initState, action) => {
    switch (action.type) {
      case GET_USER_ORDER_REQUEST:
        return {
          ...state,
          loading: true
        }
    
      case GET_USER_ORDER_SUCCESS:
        return {
          ...state,
          orders: action.payload.orders,
          orderFetching: false,
        };
       
      case GET_USER_ORDER_FAIL:
        return {
          ...state,
          error: action.payload.error,
          orderFetching: false,
        };
       
        default:
            return state
    }
}

//GET USER ORDER DETAILS
export const getUserOrderDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_USER_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload.orders,
      };
   
    case GET_USER_ORDER_DETAILS_FAIL:
      break
      default:
        return state
  }
}

export const orderPayReducer = (state = initState, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {}
    default: return state;
  }
}

  export const orderReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

