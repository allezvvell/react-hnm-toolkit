import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const initialState = {
    productList : null,
    productDetail : null,
    cartList : [],
    favProducts: null,
    favList: JSON.parse(localStorage.getItem('favId')),
    error: null,
    loadingAll : false,
    loadingFav : false,
    loadingDetail : false
}


export const fetchProducts = createAsyncThunk('product/fetchAll',async (payload,thunkApi)=>{
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/?q=${payload.query}`;
    try {
        const res = await fetch(URL);
        return await res.json();
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
});

export const fetchDetail = createAsyncThunk('product/fetchDetail',async(id,thunkApi)=>{
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products/${id}`;
    try {
        const res = await fetch(URL);
        return await res.json();
      } catch (error) {
        thunkApi.rejectWithValue(error.message)
      }
});

export const fetchFav = createAsyncThunk('product/fetchFav',async(thunkApi)=>{
    const URL = `https://my-json-server.typicode.com/allezvvell/react-hnm/products`;
    try {
        const res = await fetch(URL);
        return await res.json();
    } catch (error) {
        thunkApi.rejectWithValue(error.message)
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addCart(state,action){
            state.cartList = [...state.cartList,action.payload.id]
        },
        deleteCart(state,action){
            state.cartList = action.payload.newCartList
        },
        setFavList(state,action){
            state.favList = action.payload.favList
        },
        deleteFavList(state,action){
            state.favList = action.payload.newFavList
        },
        trueLoadingAll(state,action){
            state.loadingAll = true
        },
        trueLoadingFav(state,action){
            state.loadingFav = true
        },
        trueLoadingDetail(state,action){
            state.loadingDetail = true
        },
        initialProductDetail(state,action){
            state.productDetail = null
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchProducts.pending,(state,action) => {

        }).addCase(fetchProducts.fulfilled,(state,action) => {
            state.productList = action.payload;
            state.loadingAll = false;
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.error = action.payload
        });
        builder.addCase(fetchDetail.pending,(state,action) => {

        }).addCase(fetchDetail.fulfilled,(state,action) => {
            state.productDetail = action.payload;
           state.loadingDetail = false;
        }).addCase(fetchDetail.rejected, (state,action) => {
            state.error = action.payload
        });
        builder.addCase(fetchFav.pending,(state,action) => {

        }).addCase(fetchFav.fulfilled,(state,action)=>{
            const favData = action.payload.filter((item) => 
            state.favList.includes(item.id));
            state.favProducts = favData;
            state.loadingFav = false;
        }).addCase(fetchFav.rejected, (state,action) => {
            state.error = action.payload
        })
    }
})

export const productActions = productSlice.actions;
export default productSlice.reducer;