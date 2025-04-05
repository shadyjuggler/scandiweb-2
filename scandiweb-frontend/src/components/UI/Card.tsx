import cartWhite from "../../assets/cart-white.svg";

interface CardProps {
    imgPath?: string;
    title: string;
    price: string;
    isInStock: boolean;
}
export const Card: React.FC<CardProps> = ({
    imgPath,
    title,
    price,
    isInStock,
}) => {
    return (
        <div className="card relative">
            <div className="card-placeholder relative">
                {imgPath ? (
                    <img src={imgPath} alt="card_image" />
                ) : (
                    "IMG PLACEHOLDER"
                )}

                {isInStock && (
                    <span className="quickshop absolute right-10 -bottom-0 z-10 translate-y-1/2  opacity-0 pointer-events-none">
                        <img src={cartWhite} alt="cart" />
                    </span>
                )}
            </div>

            <div className="mt-4">
                <p className="text-lg">{title}</p>
            </div>

            <div className="mt-2">
                <p className="text-lg font-medium">{price}</p>
            </div>

            <div
                className={`${
                    isInStock ? "hidden" : "flex"
                } absolute top-0 left-0 outofstock`}
            >
                <p className="text-2xl uppercase font-medium text-[#8D8F9A]">
                    out of stock
                </p>
            </div>
        </div>
    );
};
