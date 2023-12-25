import {
   
    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_FAIL,

    CLEAR_ERRORS

} from '../constants/bannerConstants'

const initState = {
    error: null,
    loading: false,
    banner: {}
}

export const bannerReducer = (state = initState, action) => {
    switch (action.type) {
  
        case CREATE_BANNER_REQUEST:
            return {
                ...state,
                loading: true
            }
  
        case CREATE_BANNER_SUCCESS:
            return {
                loading: false,
                banner: action.payload
            }
  
        case CREATE_BANNER_FAIL:
            return {
                ...state,
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



