import cartWhite from "../../assets/cart-white.svg";
import { ProductType } from "../../types";

interface CardProps {
    data: ProductType;
}
export const ProductCard: React.FC<CardProps> = ({
    data: { gallery, name, prices, inStock },
}) => {
    return (
        <div className="productCard relative">
            <div className="productCard-placeholder relative">
                {gallery.length !== 0 ? (
                    <img className="max-h-full" src={gallery[0].url} alt="card_image" />
                ) : (
                    "IMG PLACEHOLDER"
                )}

                {inStock && (
                    <span className="quickshop absolute right-10 -bottom-0 z-10 translate-y-1/2  opacity-0 pointer-events-none">
                        <img src={cartWhite} alt="cart" />
                    </span>
                )}
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
