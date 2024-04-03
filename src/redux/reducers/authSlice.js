import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authenticate:false,
}

// function authReducer(state=initialState,action){
//     let {type,payload} = action;
//     switch(type){
//         case 'LOGIN_SUCCESS':
//             return {...state,authenticate:true,id:payload.id,pw:payload.pw}
//         case 'SET_AUTH_FALSE':
//             return {...state,authenticate:false}
//         default : 
//             return {...state}    
//     }
    
// }

// export default authReducer

const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers:{
        loginSuccess(state,action){
            state.authenticate = true
        },
        logoutSucess(state,action){
            state.authenticate = false
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;