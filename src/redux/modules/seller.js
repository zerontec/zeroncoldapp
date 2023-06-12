
const FETCH_SELLER_FAILURE = 'FETCH_SELLER_FAILURE'
const FETCH_SELLER_SUCCESS = 'FETCH_SELLER_SUCCESS'
const FETCH_SELLER_REQUEST ='FETCH_SELLER_REQUEST'
const CREATE_SELLER = 'CREATE_SELLER'
const CREATE_SELLER_ERROR='CREATE_SELLER_ERROR'


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
          `https://expressjs-postgres-production-bd69.up.railway.app/api/seller/search-query?q=${query}`
        );
        const data = await response.json();
        dispatch(fetchSellerSuccess(data));
      } catch (error) {
        dispatch(fetchSellersFailure(error.message));
      }
    };
 
  


  export const initialState = {

sellers: [],
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


        case FETCH_SELLER_SUCCESS:
            return {
              ...state,
              isLoading: false,
              sellers: action.payload
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
      sellers:action.payload,
      error:null,
      
                }


                case CREATE_SELLER_ERROR:
                    return {
                      ...state,
                      sellers: null,
                      error: action.payload.msg,
                    };
              

               
                default:
                    return state;


}





}




