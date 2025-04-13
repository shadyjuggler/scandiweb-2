import React from "react";
import { Modal } from "../Framework/Modal";

import { CartItem } from "./CartItem";
import { MakeOrderBtn } from "./MakeOrderBtn";

import { useCart } from "../../context/CartContext";
import { useModal } from "../../context/ModalContext";

import { pluralize } from "../../utils/plurarize";
import { formatPrice } from "../../utils/formatPrice";

export const CartModal: React.FC<{ isModalOpen: boolean }> = ({
    isModalOpen,
}) => {
    const {
        cartProducts,
        stats: { totalPrice, productQuantity },
    } = useCart();
    const { toggleModalVisibility } = useModal();

    return (
        <Modal
            onBackdropClick={() => toggleModalVisibility(false)}
            isOpen={isModalOpen}
            className="cartModal"
            backdropClassName="cartModal-bg"
        >
            <p className="font-bold">
                My Bag,{" "}
                <span className="font-medium">{`${pluralize(
                    productQuantity,
                    "Item"
                )}`}</span>
            </p>

            <div className="mt-8 px-1 flex flex-col gap-8 max-h-90 overflow-y-scroll scrollbar">
                {/* Map Cart Products */}

                {cartProducts.length === 0 && (
                    <p className="py-8 font-semibold text-center">
                        Cart is empty
                    </p>
                )}

                {cartProducts.map(
                    ({
                        product: { id, name, attributes, prices, gallery },
                        quantity,
                        selectedAttributeItems,
                    }) => {
                        return (
                            <CartItem
                                id={id}
                                key={
                                    id + JSON.stringify(selectedAttributeItems)
                                }
                                title={name}
                                price={formatPrice(
                                    prices[0].currency.symbol,
                                    prices[0].amount
                                )}
                                attributeSets={attributes}
                                selectedAttributeItems={selectedAttributeItems}
                                quantity={quantity}
                                imgUrl={gallery[0].url} // First image url from gallery
                            />
                        );
                    }
                )}
            </div>

            <div className="mt-8 flex justify-between">
                <p className="text-lg font-medium roboto">Total</p>
                <p className="subtitle">{`$${totalPrice}`}</p>
            </div>

            <div className="mt-8">
                <MakeOrderBtn text="place order" />
            </div>
        </Modal>
    );
};
