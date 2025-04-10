import cart from "../../assets/cart.svg";
import logo from "../../assets/logo.svg";

import { CartModal } from "./CartModal";

import { ProductCategories } from "./ProductCategories";

import { useCart } from "../../context/CartContext";
import { useModal } from "../../context/ModalContext";

export const Navbar: React.FC = () => {
    const {
        cartProducts,
        stats: { productQuantity },
    } = useCart();
    
    const { isModalOpen, toggleModalVisibility } = useModal();

    return (
        <nav
            id="navbar"
            className="fixed z-50 bg-white top-0 left-0 w-full py-4"
        >
            <div className="container mx-auto flex items-center">
                <div className="basis-1/3 flex mt-4 justify-left">
                    <ProductCategories />
                </div>

                <div className="basis-1/3 flex justify-center">
                    <img src={logo} alt="logo" />
                </div>

                <div className="basis-1/3 relative flex justify-end">
                    <button
                        onClick={() => toggleModalVisibility(!isModalOpen)}
                        className="w-10 h-10 flex items-center justify-center cursor-pointer"
                    >
                        <img src={cart} alt="cart" />
                    </button>
                    <div className="absolute">
                        <CartModal isModalOpen={isModalOpen} />
                    </div>
                    {cartProducts.length !== 0 && (
                        <span className="absolute text-white rounded-full bg-[#1D1F22] w-6 h-6 text-center -top-1 -right-2 font-bold">
                            {productQuantity}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};
