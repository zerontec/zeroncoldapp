/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import axios from 'axios'

const URL = 'https://expressjs-postgres-production-bd69.up.railway.app/'
const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST'
const FETCH_PRODUCT_SUCCESS ='FETCH_PRODUCT_SUCCESS'
const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const UPDATE_PRODUCT ='UPDATE_PRODUCT'
const DELETE_PRODUCT ='DELETE_PRODUCT'
const MOVE_INVENTORY= 'MOVE_INVENTORY'


export const fetchProductRequest = () => ({
    type: FETCH_PRODUCT_REQUEST,
  });
  
  export const fetchProductSuccess = (products) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: products,
  });
  
  export const fetchProductFailure = (error) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  });
  
  export const fetchProducts = (query) => {
    return async function (dispatch) {
      dispatch(fetchProductRequest());
      try {
        const response = await fetch(
          `https://expressjs-postgres-production-bd69.up.railway.app/api/product/search-query?q=${query}`);
        const data = await response.json();
        dispatch(fetchProductSuccess(data));
      } catch (error) {
        dispatch(fetchProductFailure(error.message));
      }
    };
  };
  export const createProducts = (formInfo) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}api/product/create`,
        formInfo
      );
      dispatch({
        type: CREATE_PRODUCT,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ message: "El código ya existe. Ingrese otro." });
      }
      throw error;
    }
  };

  export function getAllProduct() {
    return async function (dispatch) {
      try {
        const resp = await axios.get(`${URL}product/all `);
  
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: resp.data,
        });
      } catch (err) {
        return err.response;
      }
    };
  }
  


  export function updateProduct(id, data) {
    return async function (dispatch) {
      try {
        const resp = await axios.put(`${URL}api/product/update/${id}`, data);
  
        return dispatch({
          type: UPDATE_PRODUCT,
          payload: resp.data,
        });
      } catch (err) {
        return err.response;
      }
    };
  }


  export const deleteProduct = (id) => async (dispatch) => {
    try {
      await axios.delete(`${URL}api/product/delete/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: { id },
      });
    } catch (err) {
      return err.response;
    }
  };


  export const moveInventory = (formInfo) => async(dispatch)=>{

try{
    const {data}= await axios.post(

      `${URL}api/product/move-to-store`,
      formInfo
    );
    dispatch({
        type:MOVE_INVENTORY,
        payload:data

    });
    return data;

}catch(error){
  return error.response

}



  }

  export const initialState = {
    products: [],
    message: null,
    error: null,
   sendProducts:{}
    
  };

  export default function productReducer(state = initialState, action) {
    switch (action.type) {


      case GET_ALL_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        };
  


      case CREATE_PRODUCT:
        return {
          ...state,
          products: action.payload,
        };
  
        case FETCH_PRODUCT_REQUEST:
          return{
            ...state,
          isLoading: true,
          error: null
      
          }

          case FETCH_PRODUCT_SUCCESS:
            return{

                ...state,
                isLoading: false,
                products:action.payload


            }
            case FETCH_PRODUCT_FAILURE:
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload
                };

                case DELETE_PRODUCT:
                  return{
                      ...state

                  };

                  case MOVE_INVENTORY:
                    return{

                      ...state,

            sendProducts: action.payload,  
                    }
  
  
      default:
        return state;
    }
  }
  

