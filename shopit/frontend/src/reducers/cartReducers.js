import {
ADD_TO_CART, 
ADD_TO_CART_REQUEST,
ADD_TO_CART_SUCCESS,
CART_SAVE_PAYMENT,
ADD_TO_CART_FAIL,
RESET_CART,
// REMOVE_CART_ITEM, 
// SAVE_SHIPPING_INFO 
} from '../constants/cartConstants';

  const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
    error: null
};

export const cartReducer = (state = initState, action) => {
  switch(action.type){
    case ADD_TO_CART_REQUEST:
       return {
            ...state,
            updatingCart: true
        }
     
      
        case ADD_TO_CART:
            // const resultItem = action.payload.cartItems;
            // console.log('dileep',resultItem)
            return {
            //   ...state,
              cartItems: action.payload.cartItems,
              updatingCart: false
          }
      
        case CART_SAVE_PAYMENT:
            return { ...state, payment: action.payload };
            
    case ADD_TO_CART_SUCCESS:
        console.log('cartItemsDDDDD',action.payload.cartItems)
        return {
            ...state,
            cartItems: action.payload.cartItems,
            
            updatingCart: false
        }
        
        // break;
    
    case ADD_TO_CART_FAIL:
        return {
            ...state,
            updatingCart: false,
            error: action.payload.error
        }
        
    case RESET_CART:
        return {
            ...initState
        }
       
        default:
      return state
}

}