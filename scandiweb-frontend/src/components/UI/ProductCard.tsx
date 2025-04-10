import { ProductType } from "../../types/resource";

import { QuickShop } from "./QuickShop";

interface CardProps {
    product: ProductType;
}
export const ProductCard: React.FC<CardProps> = ({ product }) => {

    const { gallery, name, prices, inStock } = product;

    return (
        <div className="productCard relative">
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
