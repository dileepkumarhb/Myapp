import axios from "axios";
import {
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL,

    ADD_NEW_CATEGORY_REQUEST,
    ADD_NEW_CATEGORY_SUCCESS,
    ADD_NEW_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    ADMIN_CATEGORY_REQUEST,
    ADMIN_CATEGORY_SUCCESS,
    ADMIN_CATEGORY_FAIL,

    CLEAR_ERRORS
} from "../constants/categoryConstants";

export const getAllCategory = () => async (dispatch) =>  {
    try {

        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.get(`/api/v1/admin/category`,config);
      
        const { categoryList } = data;
        console.log('data',categoryList)
            dispatch({
                // type:ADMIN_CATEGORY_SUCCESS,
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
    } catch (error) {
        dispatch({
            type: GET_ALL_CATEGORIES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addCategory = (addCategory) => async (dispatch) => {
   console.log('cat action',addCategory)
        try {
            dispatch({ type: ADD_NEW_CATEGORY_REQUEST });
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log('addCategory',addCategory)
              const { data } = await axios.post(`/api/v1/category/create`, addCategory,config);
            console.log('dil',data)
        
                dispatch({
                    type: ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: data.category }
                });
            
        } catch (error) {   
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log('addCategory',addCategory)
             const { data } = await axios.post(`/api/v1/admin/category/create`, addCategory,config);
                 dispatch({
                    type: ADD_NEW_CATEGORY_FAIL,
                    payload: data.message
                });
        }
}

export const updateCategories = (form) => async (dispatch)=> {
   
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        
        const res = await axios.post(`/api/v1/admin/category/update`, form,config);
        if (res.status === 201) {
            dispatch({ type: UPDATE_CATEGORY_SUCCESS });
            dispatch(getAllCategory());
        } else {
            const { error } = res.data;
            dispatch({
                type: UPDATE_CATEGORY_FAIL,
                payload: { error }
            });
        }
}

export const deleteCategories = (ids) => async (dispatch) => {
    let res = await axios.post(`/api/v1/admin/category/delete`,{ payload:{ids} },config);

        dispatch({ type: DELETE_CATEGORY_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
       
        // let ids=[]; 
        // for(var i=0; i<checkedIdsArray.length;i++){
        //     ids = checkedIdsArray 
        //     console.log('result',ids[i])
        
        // }
        
        console.log('res A',res)
        
        if (res.status === 201) {
            dispatch(getAllCategory());
            dispatch({ type: DELETE_CATEGORY_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: DELETE_CATEGORY_FAIL,
                payload: { error }
            });
        }

}

export const getAdminCategory = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_CATEGORY_REQUEST })
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
      const { data } = await axios.get(`/api/v1/admin/category`,config)
      console.log('api data',data)
      dispatch({
        type: ADMIN_CATEGORY_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: ADMIN_CATEGORY_FAIL,
        payload: error.response.data.message
      })
    }
  }


// export {
//     getAllCategory
// }

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}