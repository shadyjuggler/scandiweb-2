import React from "react";
import { Modal } from "../Framework/Modal";

import { CartItem } from "./CartItem";

import { useCart } from "../../context/CartContext";

interface CartModalProps {
    isModalOpen: boolean;
}

export const CartModal: React.FC<CartModalProps> = ({ isModalOpen }) => {
    const { cartProducts, total } = useCart();

    return (
        <Modal
            isOpen={isModalOpen}
            className="cartModal"
            backdropClassName="cartModal-bg"
        >
            <p className="font-bold">
                My Bag, <span className="font-medium">{`${cartProducts.length} items`}</span>
            </p>

            <div className="mt-8 flex flex-col gap-8">

                {/* Map Cart Products */}

                {
                    cartProducts.length === 0 && <p className="py-8 font-semibold text-center">Cart is empty</p>
                }

                {cartProducts.map(
                    ({
                        product: { id, name, attributes, prices, gallery },
                        quantity,
                        productSelectedAttributes
                    }) => {
                        return (
                            <CartItem
                                id={id}
                                title={name}
                                price={`${prices[0].currency.symbol}${prices[0].amount}`}
                                attributeSets={attributes}
                                quantity={quantity}
                                productSelectedAttributes={productSelectedAttributes}
                                imgUrl={gallery[0].url} // First image url from gallery
                            />
                        );
                    }
                )}
            </div>

            <div className="mt-8 flex justify-between">
                <p className="text-lg font-medium roboto">Total</p>
                <p className="subtitle">{`$${total}`}</p>
            </div>

            <div className="mt-8">
                <button className="btn btn-primary py-2">place order</button>
            </div>
        </Modal>
    );
};
