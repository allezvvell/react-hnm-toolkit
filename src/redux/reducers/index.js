import { combineReducers } from 'redux';
import authReducer from './authSlice';
import productReducer from './productSlice';


export const rootReducer = combineReducers({
    auth : authReducer,
    product : productReducer
})