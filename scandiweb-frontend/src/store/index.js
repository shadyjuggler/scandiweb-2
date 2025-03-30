import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slices/category';
import productReducer from './slices/product';
import productDetailsReducer from "./slices/productDetails";
import cartReducer from "./slices/cart";
import { sessionCartMiddleWare, sessionProductMiddleWare, sessionCategoriesMiddleWare, sesstionProductDetailsMiddleWare } from "./middleware/sessionMiddleWare";

// sessionStorage.removeItem("cartData");

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().prepend([sessionCartMiddleWare.middleware,
            sessionProductMiddleWare.middleware,
            sessionCategoriesMiddleWare.middleware,
            sesstionProductDetailsMiddleWare.middleware
            ])
    }
});

export default store;