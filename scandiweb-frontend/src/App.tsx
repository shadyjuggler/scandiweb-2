import { Navbar } from "./components/UI/Navbar";
import { ProductList } from "./components/Sections/ProductList";
import { ProductDetials } from "./components/Sections/ProductDetails";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="container mx-auto">
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductList />}></Route>
                <Route path="/product/:id" element={<ProductDetials />}></Route>
            </Routes>
        </div>
    );
}

export default App;
