function loginEvent(id,pw){
    return (dispatch,getState) => {
        dispatch({type:'LOGIN_SUCCESS',payload:{id,pw}})
    }
}

export const authAction = {loginEvent}