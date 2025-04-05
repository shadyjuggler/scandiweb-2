import { Card } from "../UI/Card";

import { TextAttributesSet } from "../UI/TextAttributesSet";
import { SwatchAttributesSet } from "../UI/SwatchAttributesSet";

import { Slider } from "../Framework/Slider";
import { Slide } from "../Framework/Slide";

interface ProductDetailsInterface {
    description: string;
}

// Mock data

const gallery = [
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
];

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
                {/* Product Gallery */}
                <div className="basis-2/3 flex relative">
                    <div className="basis-1/5">
                        {/* space for pagination */}
                    </div>
                    <div className="basis-4/5">
                        <Slider
                            id="pd-slider"
                            autoScroll={false}
                            paginationClassName="pd-sliderPagination"
                            paginationGallery={gallery}
                            navigation={{
                                btnNext: "pd-btnNext",
                                btnPrev: "pd-btnPrev",
                            }}
                        >
                            {gallery.map((url) => {
                                return (
                                    <Slide key={url}>
                                        <div
                                            className={`pd-slide`}
                                            style={{
                                                backgroundImage: `url(${url})`,
                                            }}
                                        ></div>
                                    </Slide>
                                );
                            })}
                        </Slider>
                    </div>
                </div>

                {/* Product Attributes, description, price and etc */}
                <div className="basis-1/3 ">
                    <div>
                        <p className="text-3xl font-semibold">Price</p>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle robotcondensed">size:</p>
                        <div className="mt-2">
                            <TextAttributesSet
                                attributeSetItems={textAttributesSet}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="subtitle robotcondensed">color:</p>
                        <SwatchAttributesSet
                            attributeSetItems={swatchAttributesSet}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="subtitle robotcondensed">price:</p>
                        <p className="font-bold text-2xl">$50.00</p>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-primary py-2.5">
                            add to cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <p className="roboto">{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
