import { TextAttributesSet } from "../UI/TextAttributesSet";
import { SwatchAttributesSet } from "../UI/SwatchAttributesSet";

import { Slider } from "../Framework/Slider";
import { Slide } from "../Framework/Slide";
import { AttributeSetType } from "../../types";

import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById";
import { parseHtmlSafe } from "../../styles/utils/parseHtmlSafe";

interface ProductDetailsInterface {
    title: string;
    price: string;
    attributeSets: AttributeSetType[];
    gallery: string[];
    description: string;
}

export const ProductDetials: React.FC<ProductDetailsInterface> = ({}) => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Invalid id product id parameter</p>;

    const { product, isLoading, error } = useProductById(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    const gallery = product.gallery.map((galleryItem) => galleryItem.url);

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
                        <p className="text-3xl font-semibold">{product.name}</p>
                    </div>
                    {product.attributes.map((set) => {
                        return (
                            <div className="mt-4">
                                <p className="subtitle robotcondensed">size:</p>
                                <div className="mt-2">
                                    {!set.type ? (
                                        <p>Attribute set type not provided</p>
                                    ) : set.type === "swatch" ? (
                                        <SwatchAttributesSet
                                            items={set.items}
                                        />
                                    ) : set.type === "text" ? (
                                        <TextAttributesSet items={set.items} />
                                    ) : (
                                        <p>Attribute set type not recognized</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-4">
                        <p className="subtitle robotcondensed">price:</p>
                        <p className="font-bold text-2xl">{`${product.prices[0].currency.symbol}${product.prices[0].amount}`}</p>
                    </div>
                    <div className="mt-4">
                        <button disabled={!product.inStock} className="btn btn-primary py-2.5">
                            add to cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <p className="roboto">{parseHtmlSafe(product.description)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
