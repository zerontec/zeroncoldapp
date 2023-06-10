/* eslint-disable func-names */
/* eslint-disable arrow-body-style */

import axios from 'axios';

const URL = 'http://localhost:5040/api/';

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

export const fetchPurchases = (query) => {
  return async function (dispatch) {
    dispatch(fetchPurchaseRequest());
    try {
      const response = await fetch(`http://localhost:5040/api/purchase/search-ByQuery?q=${query}`);
      const data = await response.json();
      dispatch(fetchPurchaseSuccess(data));
    } catch (error) {
      dispatch(fetchPurchaseRequest(error.message));
    }
  };
};

export function getAllPurchases() {
  // eslint-disable-next-line consistent-return
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${URL}invoice/all`);

      dispatch({
        type: GET_PURCHASES,
        payload: resp.data,
      });
    } catch (err) {
      return err.response;
    }
  };
}

export const createPurchase = (purchaseData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${URL}purchase/create-purchase`,
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
