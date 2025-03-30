import { createSlice } from "@reduxjs/toolkit";

const data = sessionStorage.getItem("initProduct") ? JSON.parse(sessionStorage.getItem("initProduct")) : [];
console.log(data);
const loading = data.length === 0;

const initialState = {
    data,
    error: null,
    loading
};

const productSlice = createSlice({
    name: "products", 
    initialState,
    reducers: {
        productsLoadingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        productsLoaded: (state, action) => {
            state.loading = false;

            state.data = action.payload; 
        },
        productsLoadingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {productsLoaded, productsLoadingError, productsLoadingStart} = productSlice.actions;
export default productSlice.reducer;
