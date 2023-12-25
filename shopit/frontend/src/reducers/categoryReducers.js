import { GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,

    ADD_NEW_CATEGORY_REQUEST,
    ADD_NEW_CATEGORY_SUCCESS,
    ADD_NEW_CATEGORY_FAIL,
    ADD_NEW_CATEGORY_RESET,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,

    // ADMIN_CATEGORY_REQUEST,
    // ADMIN_CATEGORY_SUCCESS,
    // ADMIN_CATEGORY_FAIL,

    CLEAR_ERRORS
} from "../constants/categoryConstants";

// const initState = {
//     categories: [],
//     loading: false,
//     error: null
// };


const buildNewCategories = (parentCategoryId, categories, category) => {
    let myCategories = [];

    if(parentCategoryId === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                categoryName: category.categoryName,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id === parentCategoryId){
            const newCategory = {
                _id: category._id,
                categoryName: category.categoryName,
                slug: category.slug,
                parentCategoryId: category.parentCategoryId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentCategoryId, cat.children, category) : []
            });
        }

        
    }


    return myCategories;
}

    export const allCategoriesReducer = (state = { categories:[] }, action) => {
        switch (action.type) {
            case GET_ALL_CATEGORIES_REQUEST:
            // case ADMIN_CATEGORY_REQUEST:
                return {
                    loading: true,
                    categories: []
                }
    
            case GET_ALL_CATEGORIES_SUCCESS:
              console.log('action res',action.payload.categories)
                return {
                    loading: false,
                    categories: action.payload.categories
                }
            
            // case ADMIN_CATEGORY_SUCCESS:
            //   return {
            //     loading: false,
            //     categories: action.payload
            //   }
    
            case GET_ALL_CATEGORIES_FAIL:
            // case ADMIN_CATEGORY_FAIL:
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

    export const categoryReducer = (state = {}, action) => {
        switch (action.type) {
          case DELETE_CATEGORY_REQUEST:
          case UPDATE_CATEGORY_REQUEST:
            return {
              ...state,
              loading: true
            }
          case DELETE_CATEGORY_SUCCESS:
            return {
              ...state,
              loading: false,
              isDeleted: action.payload
            }
          case UPDATE_CATEGORY_SUCCESS:
            return {
              ...state,
              loading: false,
              isUpdated: action.payload
            }
          case DELETE_CATEGORY_FAIL:
          case UPDATE_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload
            }
          case DELETE_CATEGORY_RESET:
            return {
              ...state,
              isDeleted: false
            }
          case UPDATE_CATEGORY_RESET:
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

    export const newCategoryReducer = (state = { category: {} }, action) => {
        switch (action.type) {
          case ADD_NEW_CATEGORY_REQUEST:
            return {
              ...state,
              loading: true
            }
          case ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentCategoryId, state.categories, category);
            console.log('updated categoires', updatedCategories);
            return {
             
              loading: false,
              ...state,
                categories: updatedCategories,
            }
          case ADD_NEW_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload
            }
          case ADD_NEW_CATEGORY_RESET:
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
      