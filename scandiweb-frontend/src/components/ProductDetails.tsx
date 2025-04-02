import { Card } from "./Card";

import { TextAttributesSet } from "./UI/TextAttributesSet";
import { SwatchAttributesSet } from "./UI/SwatchAttributesSet";

interface ProductDetailsInterface {
    description: string;
}

const textAttributesSet = [
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
];

const swatchAttributesSet = [
    {
        displayValue: "Green",
        value: "#44FF03",
        id: "Green"
    },
    {
        "displayValue": "Cyan",
        value: "#03FFF7",
        id: "Cyan"
    },
    {
        displayValue: "Blue",
        value: "#030BFF",
        id: "Blue"
    },
    {
        displayValue: "Black",
        value: "#000000",
        id: "Black"
    },
    {
        displayValue: "White",
        value: "#FFFFFF",
        id: "White"
    }
];

export const ProductDetials: React.FC<ProductDetailsInterface> = ({
    description,
}) => {
    return (
        <section id="product-details" className="py-16">
            <div className="flex gap-16">
                <div className="flex-2/3 bg-amber-500">abc</div>
                <div className="flex-1/3 ">
                    <div>
                        <p className="text-3xl font-semibold">Price</p>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">size:</p>
                        <div className="mt-2">
                            <TextAttributesSet
                                data={textAttributesSet}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">color:</p>
                        <SwatchAttributesSet data={swatchAttributesSet}/>
                    </div>
                    
                    <div className="mt-4">
                        <p className="subtitle">price:</p>
                        <p className="font-bold text-2xl">$50.00</p>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-primary py-2.5">
                            add to cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
