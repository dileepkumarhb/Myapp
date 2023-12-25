import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,

    GET_PRODUCTS_BY_SLUG,
    GET_PRODUCT_PAGE_REQUEST,
    GET_PRODUCT_PAGE_SUCCESS,
    GET_PRODUCT_PAGE_FAILURE,

    GET_PRODUCT_DETAILS_BY_ID_FAILURE,
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
    GET_PRODUCT_DETAILS_BY_ID_REQUEST,
    
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,

    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,

    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,

    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,

    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,

    // UPDATE_FILTERS_VALUE,
    CLEAR_ERRORS

} from '../constants/productConstants'
// ,files:[]

const initState = {
  products: [],
  priceRange: {},
  productsByPrice: {},
  pageRequest: false,
  page: {},
  error: null,
  productDetails: {},
  loading: false,
  filters: {
    color: "all",
  },
};

export const productListReducer = (state = initState, action) => {

  switch (action.type) {
    case GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;
    case GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;
    case GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;
    case GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
      break;
    case GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };
      break;
    case GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
      default:
        return state;
  }
 
};

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
                // files:[] 
            }

            case ALL_PRODUCTS_SUCCESS:
              return {
                  loading: false,
                  products: action.payload.products,
                  productsCount: action.payload.productsCount,
                  resPerPage: action.payload.resPerPage,
                  filteredProductsCount: action.payload.filteredProductsCount
              }
        
              case ADMIN_PRODUCTS_SUCCESS:
                return {
                    loading: false,
                    products: action.payload
                }
    
            case ALL_PRODUCTS_FAIL:
            case ADMIN_PRODUCTS_FAIL:
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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      }
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      }
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false
      }
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  console.log('action',{product: action.payload})
    switch (action.type) {
      case PRODUCTS_DETAILS_REQUEST:
        return {
          ...state,
          loading: true
        }

      case PRODUCTS_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload
        }
      case PRODUCTS_DETAILS_FAIL:
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

  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true
        }
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload
        }
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          error: action.payload
        }
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false
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

  export const productReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {
  
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
  
        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }
  
        case GET_REVIEWS_FAIL:
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

  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true
        }
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload
        }
      
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          error: action.payload
        }
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
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

  export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case NEW_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case NEW_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product,
        }
      case NEW_PRODUCT_FAIL:
        return {
          ...state,
          error: action.payload
        }
      case NEW_PRODUCT_RESET:
        return {
          ...state,
          success: false
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
  