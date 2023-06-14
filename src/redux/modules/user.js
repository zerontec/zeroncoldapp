


import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL_D = "http://localhost:5040/";
const API_URL = "https://expressjs-postgres-production-bd69.up.railway.app/"


const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const CREATE_USER = 'CREATE_USER';
const GET_USERS = 'GET_USERS';
const CREATE_USER_SUCCESS ='CREATE_USER_SUCCESS';
const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER ='DELETE_USER'


export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (customers) => ({
  type: FETCH_USER_SUCCESS,
  payload: customers,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUsers= (queryPu) => async(dispatch) => {
 
    dispatch(fetchUserRequest());
    try {
      const response = await fetch(`${API_URL}api/users/search-query?q=${queryPu}`);
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
      return data
    } catch (error) {
      dispatch(fetchUserRequest(error.message));
      throw error 
    }
  };


export const getAllUsers= () => async(dispatch) =>  {


    try {
      const resp = await axios.get(`${API_URL}api/user/get-all`,{ headers: authHeader() });

      dispatch({
        type: GET_USERS,
        payload: resp.data,
      });
      return resp.data
    } catch (err) {
      return err.response;
    }
  };


export const createUser = (userData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${API_URL}api/user/create-user`,
        userData
      );
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: data,
      });
      // Aquí podrías enviar una notificación de éxito al usuario
    } catch (error) {
      dispatch({
        type: CREATE_USER_ERROR,
        payload: error.response.data.message,
      });
      // Aquí podrías enviar una notificación de error al usuario
    }
  };
  


  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const resp = await axios.put(`${API_URL}api/user/update/${id}`, data);
  
      dispatch({
        type: UPDATE_USER,
        payload: resp.data,
      });
  
      return resp.data;
    } catch (err) {
      return err.response;
    }
  };


  export const deleteUser = (id) => async (dispatch) => {
    try {
      await axios.delete(`${API_URL}api/user/delete/${id}`);
  
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
      return({message:"Eliminado con exito"})
    } catch (err) {
      return err.response;
    }
  };




export const initialState = {
  usuarios: [],
  message: null,
  error: null,
  sendUsuarios:{},
  
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_USERS:
      return {
        ...state,
        usuarios: action.payload,
      };

      case CREATE_USER:
        return{
          ...state,
          sendUsuarios:action.payload
    
        }



        case UPDATE_USER:
        return{
        ...state,
        usuarios:action.payload


        }
        case CREATE_USER_ERROR:
  return {
    ...state,
    isLoading: false,
    error: action.payload,
    isSuccess: false,
    usuarios: null,
  };



    default:
      return state;
  }
}
