

import axios from 'axios';

const API_URL_D = "http://localhost:5040/";
const API_URL = "https://expressjs-postgres-production-bd69.up.railway.app/"

const FETCH_SUPPLIER_REQUEST = 'FETCH_SUPPLIER_REQUEST';
const FETCH_SUPPLIER_SUCCESS = 'FETCH_SUPPLIER_SUCCESS';
const FETCH_SUPPLIER_FAILURE = 'FETCH_SUPPLIER_FAILURE';

const CREATE_SUPPLIER = 'CREATE_SUPPLIER';
const GET_SUPPLIERS = 'GET_SUPPLIERS';
const CREATE_SUPPLIER_SUCCESS ='CREATE_SUPPLIER_SUCCESS';
const CREATE_SUPPLIER_ERROR = 'CREATE_SUPPLIER_ERROR';
const DELETE_SUPPLIER = 'DELETE_SUPPLIER'
const UPDATE_SUPPLIER ='UPDATE_SUPPLIER'





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
      const response = await fetch(`${API_URL}api/supplier/search-query?q=${query}`);
      const data = await response.json();
      dispatch(fetchSupplierSuccess(data));
    } catch (error) {
      dispatch(fetchSupplierRequest(error.message));
    }
  };

export const getAllSupplier =() => async(dispatch)=>  {
  

    try {
      const resp = await axios.get(`${API_URL}api/supplier/all-supplier`);

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
        `${API_URL}api/supplier/create-supplier`,
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
  
  

    export const deleteSuppliert = (id) => async (dispatch) => {
      try {
        await axios.delete(`${API_URL}api/supplier/delete-supplier/${id}`);
    
        dispatch({
          type: DELETE_SUPPLIER,
          payload: { id },
        });
        return({message:"Eliminado con exito"})
      } catch (err) {
        return err.response;
      }
    };

    export const updateSupplier = (id, data) => async (dispatch) => {
      try {
        const resp = await axios.put(`${API_URL}api/supplier/update-supplier/${id}`, data);
    
        dispatch({
          type: UPDATE_SUPPLIER,
          payload: resp.data,
        });
    
        return resp.data;
      } catch (err) {
        return err.response;
      }
    };





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

  case DELETE_SUPPLIER:
    return{
...state

    }
    case UPDATE_SUPPLIER:
      return{
      ...state,
      suppliers:action.payload


      }

    default:
      return state;
  }
}
