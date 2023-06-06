/* eslint-disable default-case */
const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMER_FAILURE'
const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS'
const FETCH_CUSTOMERS_REQUEST ='FETCH_CUSTOMERS_REQUEST'
const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
const CREATE_CUSTOMER_ERROR='CREATE_CUSTOMER_ERROR'




export const fetchCustomersRequest = () => ({
    type: FETCH_CUSTOMERS_REQUEST,
  });
  
  export const fetchCustomersSuccess = (customers) => ({
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: customers,
  });
  
  export const fetchCustomersFailure = (error) => ({
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error,
  });




  
  // eslint-disable-next-line arrow-body-style
  export const fetchCustomers = (query) => {
    // eslint-disable-next-line func-names
    return async function (dispatch) {
      dispatch(fetchCustomersRequest());
      try {
        const response = await fetch(
          `http://localhost:5040/api/customer/search-query?q=${query}`
        );
        const data = await response.json();
        dispatch(fetchCustomersSuccess(data));
      } catch (error) {
        dispatch(fetchCustomersFailure(error.message));
      }
    };
  };
  


  export const initialState = {

customers : [],
message: null,
error:null,


  }

 export default function customerReducer(state= initialState, action){

switch(action.type){

    case FETCH_CUSTOMERS_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };


        case FETCH_CUSTOMERS_SUCCESS:
            return {
              ...state,
              isLoading: false,
              customers: action.payload
            };


            case FETCH_CUSTOMERS_FAILURE:
                return {
                  ...state,
                  isLoading: false,
                  error: action.payload
                };
        

            case CREATE_CUSTOMER:
                return{
      
      ...state,
      customer:action.payload,
      error:null,
      
                }


                case CREATE_CUSTOMER_ERROR:
                    return {
                      ...state,
                      customers: null,
                      error: action.payload.msg,
                    };
              

               
                default:
                    return state;


}





}




