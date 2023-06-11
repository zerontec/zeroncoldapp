

import axios from 'axios';

const URL = 'https://expressjs-postgres-production-bd69.up.railway.app/'

const FETCH_SUPPLIER_REQUEST = 'FETCH_SUPPLIER_REQUEST';
const FETCH_SUPPLIER_SUCCESS = 'FETCH_SUPPLIER_SUCCESS';
const FETCH_SUPPLIER_FAILURE = 'FETCH_SUPPLIER_FAILURE';

const CREATE_SUPPLIER = 'CREATE_SUPPLIER';
const GET_SUPPLIERS = 'GET_SUPPLIERS';
const CREATE_SUPPLIER_SUCCESS ='CREATE_SUPPLIER_SUCCESS';
const CREATE_SUPPLIER_ERROR = 'CREATE_SUPPLIER_ERROR';




export const fetchSupplierRequest = () => ({
  type: FETCH_SUPPLIER_REQUEST,
});

export const fetchSupplierSuccess = (customers) => ({
  type: FETCH_SUPPLIER_SUCCESS,
  payload: customers,
});

export const fetchSupplierFailure = (error) => ({
  type: FETCH_SUPPLIER_FAILURE,
  payload: error,
});

export const fetchSupliers = (query) => async(dispatch)=>  {

    dispatch(fetchSupplierRequest());
    try {
      const response = await fetch(`https://expressjs-postgres-production-bd69.up.railway.app/api/supplier/search-query?q=${query}`);
      const data = await response.json();
      dispatch(fetchSupplierSuccess(data));
    } catch (error) {
      dispatch(fetchSupplierRequest(error.message));
    }
  };

export const getAllSupplier =() => async(dispatch)=>  {
  

    try {
      const resp = await axios.get(`${URL}api/supplier/all`);

      dispatch({
        type: GET_SUPPLIERS,
        payload: resp.data,
      });
      return resp.data
    } catch (err) {
      return err.response;
    }
  };


export const createSuppliers = (supplierData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL}api/supplier/create-supplier`,
        supplierData
      );
      dispatch({
        type: CREATE_SUPPLIER_SUCCESS,
        payload: data,
      });
      // Aquí podrías enviar una notificación de éxito al usuario
      return data
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return new Error({ message: "El Rif ya existe. Ingrese otro." });
      }
      throw error;
    }
      // Aquí podrías enviar una notificación de error al usuario
    }
  
  





export const initialState = {
  suppliers: [],
  message: null,
  error: null,
  sendSuppliers:{},
  
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };

      case CREATE_SUPPLIER:
        return{
          ...state,
          sendSuppliers:action.payload
    
        }

        case FETCH_SUPPLIER_REQUEST:
          return {
            ...state,
            isLoading: true,
              error: null
          };
    
    
        case FETCH_SUPPLIER_SUCCESS:
          return {
            ...state,
            isLoading: false,
              suppliers: action.payload
          };
    
    
        case FETCH_SUPPLIER_FAILURE:
          return {
            ...state,
            isLoading: false,
              error: action.payload
          };
    

        case CREATE_SUPPLIER_ERROR:
  return {
    ...state,
    isLoading: false,
    error: action.payload,
    isSuccess: false,
    suppliers: null,
  };



    default:
      return state;
  }
}
