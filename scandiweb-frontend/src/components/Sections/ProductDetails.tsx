import { Slider } from "../Framework/Slider";
import { Slide } from "../Framework/Slide";

import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useModal } from "../../context/ModalContext";
import { useProductById } from "../../hooks/useProductById";
import { parseHtmlSafe } from "../../utils/parseHtmlSafe";
import { useEffect, useState } from "react";
import { AttributeSet } from "../UI/Attributes/AttributeSet";

import { Section } from "../Layouts/Section";

import { formatPrice } from "../../utils/formatPrice";
import { useRuntime } from "../../context/RuntimeContext";

export const ProductDetials: React.FC = ({}) => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Invalid id product id parameter</p>;

    const { product, isLoading, error } = useProductById(id);

    const { addToCart } = useCart();
    const { toggleModalVisibility } = useModal();
    const { selectedAttributeItems, setDefaultSelectedAttributeItems } =
        useRuntime();

    // When product loaded, set as selected attribute_items all attribute_items id's of first values in all attribute sets
    useEffect(() => {
        if (!product) return;

        setDefaultSelectedAttributeItems(product);
    }, [product]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Product not found</p>;

    const gelleryUrls = product.gallery.map((galleryItem) => galleryItem.url);

    return (
        <Section id="product-details">
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
                            paginationGallery={gelleryUrls}
                            navigation={{
                                btnNext: "pd-btnNext",
                                btnPrev: "pd-btnPrev",
                            }}
                        >
                            {gelleryUrls.map((url) => {
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
                            <div key={set.name} className="mt-4">
                                <p className="subtitle robotcondensed">{`${set.name}:`}</p>
                                <div className="mt-2">
                                    {!set.type ? (
                                        <p>Attribute set type not provided</p>
                                    ) : (
                                        <AttributeSet
                                            attribute_id={set.attribute_id}
                                            key={set.attribute_id}
                                            type={set.type}
                                            items={set.items}
                                            selectedAttributeItems={selectedAttributeItems}
                                            isSmall={false}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <div className="mt-4">
                        <p className="subtitle robotcondensed">price:</p>
                        <p className="font-bold text-2xl">
                            {formatPrice(
                                product.prices[0].currency.symbol,
                                product.prices[0].amount
                            )}
                        </p>
                    </div>
                    <div className="mt-4">
                        <button
                            disabled={!product.inStock}
                            onClick={() => {
                                addToCart(product, selectedAttributeItems);
                                toggleModalVisibility(true);
                            }}
                            className="btn btn-primary py-2.5"
                        >
                            add to cart
                        </button>
                    </div>
                    <div className="mt-6">
                        <div className="roboto">
                            {parseHtmlSafe(product.description)}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
