const initialState = {
    authenticate:false,
    id:'',
    pw:''
}

function authReducer(state=initialState,action){
    let {type,payload} = action;
    switch(type){
        case 'LOGIN_SUCCESS':
            return {...state,authenticate:true,id:payload.id,pw:payload.pw}
        case 'SET_AUTH_FALSE':
            return {...state,authenticate:false}
        default : 
            return {...state}    
    }
    
}

export default authReducer