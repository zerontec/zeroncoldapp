import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './modules/auth';
// eslint-disable-next-line import/order
import { composeWithDevTools } from "redux-devtools-extension";
import invoiceReducer from './modules/invoices';
import customerReducer from './modules/customer';
import productReducer from './modules/products';
import sellerReducer from './modules/seller';
import supplierReducer from './modules/supplier';
import purchaseReducer from './modules/purchase';
import cuentasxcReducer from './modules/cuentasxcobrar';
import userReducer from './modules/user';
import dolarReducer from './modules/dolar';


// Combinar los reducers de tus módulos
const rootReducer = combineReducers({
  auth: authReducer,
  invoice:invoiceReducer,
  customer:customerReducer,
  product:productReducer,
  vendedores:sellerReducer,
  supplier:supplierReducer,
  purchase:purchaseReducer,
  cuentasxc:cuentasxcReducer,
  usuarios:userReducer,
  dolar:dolarReducer
 
  // Otros módulos de Redux
});

// Configurar los middlewares
// const middleware = [thunk];

// Crear el store
// const store = createStore(rootReducer, applyMiddleware(...middleware));

// Opcional: Configurar Redux DevTools
export const store = createStore(
    rootReducer,
  
    composeWithDevTools(applyMiddleware(thunk))
  );
  
export default store;
