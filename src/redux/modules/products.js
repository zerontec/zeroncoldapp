/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import axios from 'axios'

const URL = 'http://localhost:5040/api/'
const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST'
const FETCH_PRODUCT_SUCCESS ='FETCH_PRODUCT_SUCCESS'
const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const UPDATE_PRODUCT ='UPDATE_PRODUCT'
const DELETE_PRODUCT ='DELETE_PRODUCT'

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
          `http://localhost:5040/api/product/search-query?q=${query}`
        );
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
        `${URL}product/create`,
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
        const resp = await axios.put(`${URL}product/update/${id}`, data);
  
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
      await axios.delete(`${URL}product/delete/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: { id },
      });
    } catch (err) {
      return err.response;
    }
  };

  export const initialState = {
    products: [],
    message: null,
    error: null,
   
    
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

                  }
  
  
      default:
        return state;
    }
  }
  

