import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addProduct, changeAmount, updateTotalPrice } from '../slices/cart';
import { productsLoaded } from '../slices/product';
import { categoriesLoaded } from '../slices/category';
import { productDetailsLoaded } from '../slices/productDetails';

const sessionCartMiddleWare = createListenerMiddleware();
const sessionProductMiddleWare = createListenerMiddleware();
const sessionCategoriesMiddleWare = createListenerMiddleware();
const sesstionProductDetailsMiddleWare = createListenerMiddleware();

sessionCategoriesMiddleWare.startListening({
    matcher: isAnyOf(categoriesLoaded), // specify the action to listen to
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        const data = state.category.data;

        sessionStorage.setItem("categories", JSON.stringify(data));
    },
});

sessionProductMiddleWare.startListening({
    matcher: isAnyOf(productsLoaded), // specify the action to listen to
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        const data = state.product.data;
        sessionStorage.setItem("initProduct", JSON.stringify(data));
    },
});

sesstionProductDetailsMiddleWare.startListening({
    matcher: isAnyOf(productDetailsLoaded), // specify the action to listen to
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        const data = state.productDetails.data;

        sessionStorage.setItem("productDetails", JSON.stringify(data));
    },
});

sessionCartMiddleWare.startListening({
    matcher: isAnyOf(addProduct, changeAmount, updateTotalPrice), // specify the action to listen to
    effect: (action, listenerApi) => {
        const state = listenerApi.getState();
        const cartData = state.cart.data;

        sessionStorage.setItem("cartData", JSON.stringify(cartData));
        sessionStorage.setItem("cartItemsAmount", state.cart.totalItemsAmount);
        sessionStorage.setItem("cartTotalPrice", state.cart.totalPrice);
    },
});





export {sessionCartMiddleWare, sessionProductMiddleWare, sessionCategoriesMiddleWare, sesstionProductDetailsMiddleWare} ;
