import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


// import api from "./services";
// const { http, products } = api;
// http(products("tech")).
//     then(resp => resp.json()).
//     then(data => console.log(data)).
//     catch(error => console.log(error.message));