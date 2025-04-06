import { Navbar } from "./components/UI/Navbar";
import { ProductList } from "./components/Pages/ProductList";
import { ProductDetials } from "./components/Pages/ProductDetails";
import { AttributeSetType } from "./types";
import { useState } from "react";

const attributeSets: AttributeSetType[] = [
    {
        name: "Size",
        items: [
            {
                displayValue: "Small",
                value: "S",
                id: "Small",
            },
            {
                displayValue: "Medium",
                value: "M",
                id: "Medium",
            },
            {
                displayValue: "Large",
                value: "L",
                id: "Large",
            },
            {
                displayValue: "Extra Large",
                value: "XL",
                id: "Extra Large",
            },
        ],
        type: "text",
    },
    {
        name: "Color",
        items: [
            {
                displayValue: "Green",
                value: "#44FF03",
                id: "Green",
            },
            {
                displayValue: "Cyan",
                value: "#03FFF7",
                id: "Cyan",
            },
            {
                displayValue: "Blue",
                value: "#030BFF",
                id: "Blue",
            },
            {
                displayValue: "Black",
                value: "#000000",
                id: "Black",
            },
            {
                displayValue: "White",
                value: "#FFFFFF",
                id: "White",
            },
        ],
        type: "swatch",
    },
];

const gallery = [
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
];

function App() {
    const [category, setCategory] = useState<string>("all");

    return (
        <div className="container mx-auto">
            <Navbar setCategory={setCategory} />
            <ProductList category={category} />
            {/* <ProductDetials
                title="Jacket"
                price="$50.00"
                gallery={gallery}
                attributeSets={attributeSets}
                description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.F"
            /> */}
        </div>
    );
}

export default App;
