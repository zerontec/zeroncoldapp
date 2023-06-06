/* eslint-disable func-names */
/* eslint-disable arrow-body-style */

import axios from 'axios';

const URL = 'http://localhost:5040/api/';

const FETCH_IVOICE_REQUEST = 'FETCH_IVOICE_REQUEST';
const FETCH_IVOICE_SUCCESS = 'FETCH_IVOICE_SUCCESS';
const FETCH_IVOICE_FAILURE = 'FETCH_IVOICE_FAILURE';

const CREATE_INVOICE = 'CREATE_INVOICE';
const GET_INVOICES = 'GET_INVOICES';

export const fetchInvoiceRequest = () => ({
  type: FETCH_IVOICE_REQUEST,
});

export const fetchInvoiceSuccess = (customers) => ({
  type: FETCH_IVOICE_SUCCESS,
  payload: customers,
});

export const fetchInvoiceFailure = (error) => ({
  type: FETCH_IVOICE_FAILURE,
  payload: error,
});

export const fetchInvoices = (query) => {
  return async function (dispatch) {
    dispatch(fetchInvoiceRequest());
    try {
      const response = await fetch(`http://localhost:5040/api/invoice/search-ByQuery?q=${query}`);
      const data = await response.json();
      dispatch(fetchInvoiceSuccess(data));
    } catch (error) {
      dispatch(fetchInvoiceRequest(error.message));
    }
  };
};

export function getAllInvoices() {
  // eslint-disable-next-line consistent-return
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${URL}invoice/all`);

      dispatch({
        type: GET_INVOICES,
        payload: resp.data,
      });
    } catch (err) {
      return err.response;
    }
  };
}

export const initialState = {
  invoices: [],
  message: null,
  error: null,
  sendInvoice:{},
  
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

      case CREATE_INVOICE:
        return{
          ...state,
          sendInvoice:action.payload
    
        }


    default:
      return state;
  }
}
