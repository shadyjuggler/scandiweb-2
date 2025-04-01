import { createSlice } from "@reduxjs/toolkit";

import generateRandomID from "../../functions/helpers/randomId";

import isArraysEqual from "../../functions/helpers/isArraysEqual";

const cartData = sessionStorage.getItem("cartData");
const cartItemsAmount = sessionStorage.getItem("cartItemsAmount")
const data = cartData ? JSON.parse(cartData) : {};
const totalItemsAmount = cartItemsAmount ? +cartItemsAmount : 0;
const totalPrice = sessionStorage.getItem("cartTotalPrice") ? +sessionStorage.getItem("cartTotalPrice") : 0;

const allowedToPlaceOrder = totalItemsAmount !== 0;

const initialState = {
    data, 

    totalPrice,
    totalItemsAmount,

    isOpened: false,
    allowedToPlaceOrder,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isOpened = !state.isOpened;
        },
        addProduct: (state, action) => {
            let cartItemId = generateRandomID();

            // To be sure that cartItem id will be unique in current order
            while (state.data[cartItemId]) {
                cartItemId = generateRandomID();
            }

            const { id: payloadId, activeAttributes: payloadActiveAttributes } = action.payload;


            state.totalItemsAmount += 1;


            // Check if we are trying to add identical product, if yes increase amount for existing one
            for (let cartItemId in state.data) {
                const { id, activeAttributes } = state.data[cartItemId];

                if (
                    id === payloadId
                    &&
                    isArraysEqual(activeAttributes, payloadActiveAttributes)
                ) {
                    state.data[cartItemId].amount += 1;
                    return;
                }
            }

            state.data[cartItemId] = action.payload;
            state.data[cartItemId].amount = 1;

        },
        changeAmount: (state, action) => {
            const { cartItemId, value } = action.payload;
            state.data[cartItemId].amount += value;
            state.totalItemsAmount += value;

            if (state.data[cartItemId].amount <= 0) {
                delete state.data[cartItemId];
            }
        },
        updateTotalPrice: (state) => {
            state.totalPrice = Object.keys(state.data).reduce((a, c) => {
                const addToTotal = state.data[c].price * state.data[c].amount;
                return a += addToTotal;
            }, 0);
        },
        canPlaceOrder: (state, action) => {
            state.allowedToPlaceOrder = action.payload;
        }
    }
});

export const { toggleModal, addProduct, changeAmount, updateTotalPrice, canPlaceOrder } = cartSlice.actions;
export default cartSlice.reducer;
