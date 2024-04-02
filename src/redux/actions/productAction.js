function getProductList(query){
    return async (dispatch,getState)=>{
        let URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/?q=${query}`; 
        try {
            let res = await fetch(URL);
            let data = await res.json();
            dispatch({type:'GET_PRODUCT',payload:{data}});
        } catch (error) {
            console.log(error)
        }        
    }
}

function getProductDetail(id){
    return async(dispatch,getState) => {
        const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/${id}`;
        try {
          const response = await fetch(URL);
          const data = await response.json();
          dispatch({type:'GET_DETAIL',payload:{data}})
        } catch (error) {
          console.log(error);
        }
    }
}

function getFavProduct(favList){
    return async(dispatch,getState) => {
        const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products`;
        try {
            const response = await fetch(URL);
            const data = await response.json();
            const favData = data.filter((item) => 
            favList.includes(item.id)
            );
            dispatch({type:'SET_FAV_PRODUCTS',payload:{favData}}); 
          } catch (error) {
            console.log(error);
          }
    }
}

export const productAction = {getProductList,getProductDetail,getFavProduct}