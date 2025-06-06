import cartWhite from "../../assets/cart-white.svg";
import { useCart } from "../../context/CartContext";
import { ProductType } from "../../types/resource";
import { useModal } from "../../context/ModalContext";
import { productToAttributeRecords } from "../../utils/productToAttributeRecords";

export const QuickShop: React.FC<{ product: ProductType }> = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleModalVisibility } = useModal();

    return (
        <span
            onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                e.preventDefault();
                addToCart(product, productToAttributeRecords(product, true));
                toggleModalVisibility(true);
            }}
            className="quickshop absolute right-10 -bottom-0 z-30 translate-y-1/2 opacity-0 pointer-events-none"
        >
            <img src={cartWhite} alt="cart" />
        </span>
    );
};
