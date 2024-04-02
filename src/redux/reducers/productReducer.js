const initialState = {
    productList : null,
    productDetail : null,
    cartList : [],
    favProducts: null,
    favList: JSON.parse(localStorage.getItem('favId'))
}

function productReducer(state=initialState,action){
    let {type,payload} = action;
    switch(type){
        case 'GET_PRODUCT':
            return {...state,productList:payload.data}
        case 'GET_DETAIL':
            return {...state,productDetail:payload.data}
        case 'ADD_CART':
            return {...state,cartList:[...state.cartList,payload.id]}
        case 'DELETE_CART' : 
            return {...state,cartList:payload.newCartList} 
        case 'SET_FAV_PRODUCTS' :
            return {...state,favProducts:payload.favData}
        case 'SET_FAV_LIST' :
            return {...state,favList:payload.favlist}    
        case 'DELETE_FAV_LIST' :
            return {...state,favList:payload.newFavList}                   
        default : 
            return {...state}    
    }
    
}

export default productReducer