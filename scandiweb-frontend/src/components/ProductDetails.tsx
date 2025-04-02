import { Card } from "./Card";

import { TextAttributesSet } from "./UI/TextAttributesSet";
import { SwatchAttributesSet } from "./UI/SwatchAttributesSet";

import { Slider } from "./UI/Slider";
import { Slide } from "./UI/Slide";

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
];

export const ProductDetials: React.FC<ProductDetailsInterface> = ({
    description,
}) => {
    return (
        <section id="product-details" className="py-16">
            <div className="flex gap-16">
                <div className="basis-2/3 flex relative">
                    <div className="basis-1/5"></div>
                    <div className="basis-4/5">
                        <Slider
                            id="pd-slider"
                            autoScroll={false}
                            paginationClassName="pd-sliderPagination"
                        >
                            <Slide>
                                <div className="bg-blue-500 flex items-center justify-center text-white text-4xl">
                                    Slide 1
                                </div>
                            </Slide>
                            <Slide>
                                <div className="bg-green-500 flex items-center justify-center text-white text-4xl">
                                    Slide 2
                                </div>
                            </Slide>
                            <Slide>
                                <div className="bg-red-500 flex items-center justify-center text-white text-4xl">
                                    Slide 3
                                </div>
                            </Slide>
                        </Slider>
                    </div>
                </div>
                <div className="basis-1/3 ">
                    <div>
                        <p className="text-3xl font-semibold">Price</p>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">size:</p>
                        <div className="mt-2">
                            <TextAttributesSet data={textAttributesSet} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle">color:</p>
                        <SwatchAttributesSet data={swatchAttributesSet} />
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
