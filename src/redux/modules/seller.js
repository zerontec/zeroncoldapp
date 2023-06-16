

import axios from 'axios';
import authHeader from '../services/auth-header';

const FETCH_SELLER_FAILURE = 'FETCH_SELLER_FAILURE'
const FETCH_SELLER_SUCCESS = 'FETCH_SELLER_SUCCESS'
const FETCH_SELLER_REQUEST ='FETCH_SELLER_REQUEST'
const CREATE_SELLER = 'CREATE_SELLER'
const CREATE_SELLER_ERROR='CREATE_SELLER_ERROR'
const GET_SELLERS ='GET_SELLERS'
const UPDATE_SELLER = 'UPDATE_SELLER'
const DELETE_SELLER = 'DELETE_SELLER'
const CREATE_SELLER_SUCCESS='CREATE_SELLER_SUCCESS'
const API_URL_D = "http://localhost:5040/";
const API_URL = "https://expressjs-postgres-production-bd69.up.railway.app/"



export const fetchSellerRequest = () => ({
    type: FETCH_SELLER_REQUEST,
  });
  
  export const fetchSellerSuccess = (sellers) => ({
    type: FETCH_SELLER_SUCCESS,
    payload: sellers,
  });
  
  export const fetchSellersFailure = (error) => ({
    type: FETCH_SELLER_FAILURE,
    payload: error,
  });




  
  export const fetchSellers =(query)=> async(dispatch) =>  {
    
   
      dispatch(fetchSellerRequest());
      try {
        const response = await fetch(
          `${API_URL}api/seller/search-query?q=${query}`
        );
        const data = await response.json();
        dispatch(fetchSellerSuccess(data));
      } catch (error) {
        dispatch(fetchSellersFailure(error.message));
      }
    };
 
  

    export const getAllSeller= () => async(dispatch) =>  {


      try {
        const resp = await axios.get(`${API_URL}api/seller/find-all`,{ headers: authHeader() });
  
        dispatch({
          type: GET_SELLERS,
          payload: resp.data,
        });
        return resp.data
      } catch (err) {
        return err.response;
      }
    };
  
  
  export const createSeller = (userData) => async (dispatch) => {
      try {
        const { data } = await axios.post(
          `${API_URL}api/seller/create-seller`,userData,{ headers: authHeader() }
        );
        dispatch({
          type: CREATE_SELLER_SUCCESS,
          payload: data,
        });
  
        return data;
        // Aquí podrías enviar una notificación de éxito al usuario
      } catch (error) {
        if (error.response && error.response.status === 409) {
          throw new Error("El usuario o email  ya existe. Ingrese otro.");
        }
        throw error;
      }
    };
   
  
  
    export const updateSeller = (id, data) => async (dispatch) => {
      try {
        const resp = await axios.put(`${API_URL}api/seller/update/${id}`, data,{ headers: authHeader() });
    
        dispatch({
          type: UPDATE_SELLER,
          payload: resp.data,
        });
    
        return resp.data;
      } catch (err) {
        return err.response;
      }
    };
  
  
    export const deleteSeller = (id) => async (dispatch) => {
      try {
        await axios.delete(`${API_URL}api/seller/delete/${id}`,{ headers: authHeader() });
    
        dispatch({
          type: DELETE_SELLER,
          payload: { id },
        });
        return({message:"Eliminado con exito"})
      } catch (err) {
        return err.response;
      }
    };
  
  





  export const initialState = {

vendedores: [],
message: null,
error:null,


  }

 export default function sellerReducer(state= initialState, action){

switch(action.type){

    case FETCH_SELLER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };

        case GET_SELLERS:

        return{

          ...state
          ,vendedores:action.payload

        }

        case FETCH_SELLER_SUCCESS:
            return {
              ...state,
              isLoading: false,
              vendedores: action.payload
            };


            case FETCH_SELLER_FAILURE:
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload
                };
        

            case CREATE_SELLER:
                return{
      
      ...state,
      vendedores:action.payload,
      error:null,
      
                }


                case CREATE_SELLER_ERROR:
                    return {
                      ...state,
                      vendedores: null,
                      error: action.payload.msg,
                    };
              


                    case UPDATE_SELLER:
                      return{
                      ...state,
                      vendedores:action.payload
              
              
                      }
              case DELETE_SELLER:
                return{
              
                  ...state
                }
              
           
               
                default:
                    return state;


}





}




