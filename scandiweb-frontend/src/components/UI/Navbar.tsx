import { useState } from "react";

import cart from "../../assets/cart.svg";
import logo from "../../assets/logo.svg";

import { CartModal } from "./CartModal";

import { ProductCategories } from "./ProductCategories";

interface NavbarProps {
    setActiveCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setActiveCategory }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <nav id="navbar" className="py-4 flex items-center">
            <div className="basis-1/3 flex mt-4 justify-left">
                <ProductCategories setActiveCategory={setActiveCategory} />
            </div>

            <div className="basis-1/3 flex justify-center">
                <img src={logo} alt="logo" />
            </div>

            <div className="basis-1/3 relative flex justify-end">
                <button
                    onClick={() => setModalOpen(!isModalOpen)}
                    className="w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                    <img src={cart} alt="cart" />
                </button>
                <div className="absolute">
                    <CartModal isModalOpen={isModalOpen} />
                </div>
                <span className="absolute text-white rounded-full bg-[#1D1F22] w-6 h-6 text-center -top-1 -right-2 font-bold">
                    1
                </span>
            </div>
        </nav>
    );
};
