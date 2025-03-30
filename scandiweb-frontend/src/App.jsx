import { Component } from "react";

// Components
import ProductListWrapper from "./components/ProductList/ProductListWrapper";
import ProductDetailsWrapper from "./components/ProductDetails/ProductDetailsWrapper";

// Assets
import "./styles/index.scss";

// Routing
import BaseLayout from "./router/BaseLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div id="app">
                    <Routes>
                        <Route path="/" element={<BaseLayout />}>
                            <Route path="/" element={<ProductListWrapper />} />
                            <Route path="/all" element={<ProductListWrapper />} />
                            <Route path="/tech" element={<ProductListWrapper />} />
                            <Route path="/clothes" element={<ProductListWrapper />} />
                            <Route path="/:id" element={<ProductDetailsWrapper/>}/>
                        </Route>
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;