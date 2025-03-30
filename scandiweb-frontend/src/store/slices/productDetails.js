import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const data = sessionStorage.getItem("productDetails") ? JSON.parse(sessionStorage.getItem("productDetails")) : {};

const initialState = {
    productId: null,
    data,
    error: null,
    loading: true
};

const productsDetailsSlice = createSlice({
    name: "productsDetails",
    initialState,
    reducers: {
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
        productDetailsLeavePage: (state, action) => {
            state.productId = null;
            state.loading = true;
        },
        productDetailsLoadingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        productDetailsLoaded: (state, action) => {
            state.loading = false;

            if (action.payload) {
                const { id: _, ...productDetailsData } = action.payload;
                state.data[action.payload.id] = productDetailsData;

                // Creates array based on the attributes amount for certain product,
                // Each index: the attribute, Each value: the selected attribute value, (-1) means not selected
                const length = productDetailsData.attributes.length;
                state.data[action.payload.id]["activeAttributes"] = new Array(length).fill(-1);

                // If attributes not exist for certain product => makes avaliable to add cart by defaul,
                // If attributes exist => makes not avaliable to add cart by defaul 
                state.data[action.payload.id]["canAddToCart"] = !(length > 0);
            }
        },
        productDetailsLoadingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.data = {};
        },
        setActiveAttribute: (state, action) => {
            const { productId: id, attributeIndex: index, attributeValue: value } = action.payload;

            // set certain attribute selected value
            state.data[id].activeAttributes[index] = value;
        },
        checkAllAttrForBeSelected: (state, action) => {
            const { productId: id } = action.payload;

            // check if all attributes have selected something, to make avaliable add to cart
            const isAvaliable = state.data[id].activeAttributes.every(attr => attr >= 0);

            // to avoid re-render check the current and new 'canAddToCart' values 
            if (isAvaliable !== state.data[id].canAddToCart) {
                state.data[id].canAddToCart = isAvaliable;
            }
        }
    }
})

export const { setProductId, productDetailsLeavePage, productDetailsLoadingStart, productDetailsLoaded, productDetailsLoadingError, setActiveAttribute, checkAllAttrForBeSelected } = productsDetailsSlice.actions;
export default productsDetailsSlice.reducer;
