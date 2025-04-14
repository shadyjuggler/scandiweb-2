import { Link } from "react-router-dom";
import { ProductType } from "../../types/resource";

import { QuickShop } from "./QuickShop";
import { toKebabCase } from "../../utils/toKebabCase";

export const ProductCard: React.FC<{ product: ProductType }> = ({
    product,
}) => {
    const { gallery, name, prices, inStock } = product;

    return (
        <div data-testid={`product-${toKebabCase(product.name)}`} className="productCard relative">
            <Link
                className="absolute w-full h-full top-0 left-0 z-20"
                key={product.id}
                to={`product/${product.id}`}
            ></Link>
            <div className="productCard-placeholder relative">
                {gallery.length !== 0 ? (
                    <img
                        className="max-h-full"
                        src={gallery[0].url}
                        alt="card_image"
                    />
                ) : (
                    "IMG PLACEHOLDER"
                )}

                {inStock && <QuickShop product={product} />}
            </div>

            <div className="mt-4">
                <p className="text-lg">{name}</p>
            </div>

            <div className="mt-2">
                <p className="text-lg font-medium">{`${prices[0].currency.symbol}${prices[0].amount}`}</p>
            </div>

            <div
                className={`${
                    inStock ? "hidden" : "flex"
                } absolute top-0 left-0 outofstock`}
            >
                <p className="text-2xl uppercase font-medium text-[#8D8F9A]">
                    out of stock
                </p>
            </div>
        </div>
    );
};
