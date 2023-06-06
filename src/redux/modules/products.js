/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
import axios from 'axios'

const URL = 'http://localhost:5040/api/'
const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST'
const FETCH_PRODUCT_SUCCESS ='FETCH_PRODUCT_SUCCESS'
const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
const CREATE_PRODUCT = 'CREATE_PRODUCT'


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
        `${URL}product/create-product`,
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


  export const initialState = {
    products: [],
    message: null,
    error: null,
   
    
  };

  export default function productReducer(state = initialState, action) {
    switch (action.type) {
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
  
  
      default:
        return state;
    }
  }
  

