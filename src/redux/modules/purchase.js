

import axios from 'axios';

const API_URL_D = "http://localhost:5040/";
const API_URL = "https://expressjs-postgres-production-bd69.up.railway.app/"


const FETCH_PURCHASE_REQUEST = 'FETCH_PURCHASE_REQUEST';
const FETCH_PURCHASE_SUCCESS = 'FETCH_PURCHASE_SUCCESS';
const FETCH_PURCHASE_FAILURE = 'FETCH_PURCHASE_FAILURE';

const CREATE_PURCHASE = 'CREATE_PURCHASE';
const GET_PURCHASES = 'GET_PURCHASES';
const CREATE_PURCHASE_SUCCESS ='CREATE_PURCHASE_SUCCESS';
const CREATE_PURCHASE_ERROR = 'CREATE_PURCHASE_ERROR';




export const fetchPurchaseRequest = () => ({
  type: FETCH_PURCHASE_REQUEST,
});

export const fetchPurchaseSuccess = (customers) => ({
  type: FETCH_PURCHASE_SUCCESS,
  payload: customers,
});

export const fetchPurchaseFailure = (error) => ({
  type: FETCH_PURCHASE_FAILURE,
  payload: error,
});

export const fetchPurchases = (queryPu) => async(dispatch) => {
 
    dispatch(fetchPurchaseRequest());
    try {
      const response = await fetch(`https://expressjs-postgres-production-bd69.up.railway.app/api/purchase/search-query-p?q=${queryPu}`);
      const data = await response.json();
      dispatch(fetchPurchaseSuccess(data));
      return data
    } catch (error) {
      dispatch(fetchPurchaseRequest(error.message));
      throw error 
    }
  };


export const getAllPurchases= () => async(dispatch) =>  {


    try {
      const resp = await axios.get(`${API_URL}api/invoice/all`);

      dispatch({
        type: GET_PURCHASES,
        payload: resp.data,
      });
      return resp.data
    } catch (err) {
      return err.response;
    }
  };


export const createPurchase = (purchaseData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${API_URL}api/purchase/create-purchase`,
        purchaseData
      );
      dispatch({
        type: CREATE_PURCHASE_SUCCESS,
        payload: data,
      });
      // Aquí podrías enviar una notificación de éxito al usuario
    } catch (error) {
      dispatch({
        type: CREATE_PURCHASE_ERROR,
        payload: error.response.data.message,
      });
      // Aquí podrías enviar una notificación de error al usuario
    }
  };
  





export const initialState = {
  purchases: [],
  message: null,
  error: null,
  sendPurchase:{},
  
};

export default function purchaseReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };

      case CREATE_PURCHASE:
        return{
          ...state,
          sendPurchase:action.payload
    
        }

        case CREATE_PURCHASE_ERROR:
  return {
    ...state,
    isLoading: false,
    error: action.payload,
    isSuccess: false,
    invoice: null,
  };



    default:
      return state;
  }
}
