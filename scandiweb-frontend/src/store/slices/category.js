import { createSlice } from "@reduxjs/toolkit";

const data = sessionStorage.getItem("categories") ? JSON.parse(sessionStorage.getItem("categories")) : [];
const loading = data.length === 0;
const active = data.length === 0 ? null : 0;

const initialState = {
    error: null,
    loading,
    data,
    active //index of 'cat' in data[]
};

const categorySlice = createSlice({
    name: "categories", 
    initialState,
    reducers: {
        categoriesLoaded: (state, action) => {
            state.loading = false;
            state.data = action.payload; 
            state.active = 0;
        },
        categoriesLoadingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        categorySelect: (state, action) => {
            state.active = action.payload;
        }
    }
})

export const {categoriesLoaded, categoriesLoadingError, categorySelect} = categorySlice.actions;
export default categorySlice.reducer;
