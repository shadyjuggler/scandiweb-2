import React from "react";
import { Modal } from "../Framework/Modal";

import { CartItem } from "./CartItem";
import { AttributeSetType } from "../../types";

interface CartModalProps {
    isModalOpen: boolean;
}

const attributeSets: AttributeSetType[] = [
    {
        name: "Size",
        items: [
            {
                displayValue: "Small",
                value: "S",
                id: "Small",
            },
            {
                displayValue: "Medium",
                value: "M",
                id: "Medium",
            },
            {
                displayValue: "Large",
                value: "L",
                id: "Large",
            },
            {
                displayValue: "Extra Large",
                value: "XL",
                id: "Extra Large",
            },
        ],
        type: "text"
    },
    {
        name: "Color",
        items: [
            {
                displayValue: "Green",
                value: "#44FF03",
                id: "Green",
            },
            {
                displayValue: "Cyan",
                value: "#03FFF7",
                id: "Cyan",
            },
            {
                displayValue: "Blue",
                value: "#030BFF",
                id: "Blue",
            },
            {
                displayValue: "Black",
                value: "#000000",
                id: "Black",
            },
            {
                displayValue: "White",
                value: "#FFFFFF",
                id: "White",
            }
        ],
        type: "swatch"
    }
]

export const CartModal: React.FC<CartModalProps> = ({ isModalOpen }) => {
    return (
        <Modal
            isOpen={isModalOpen}
            className="cartModal"
            backdropClassName="cartModal-bg"
        >
            <p className="font-bold">
                My Bag, <span className="font-medium">3 items</span>
            </p>

            <div className="mt-8 flex flex-col gap-8">
                <CartItem
                    title="Product"
                    price={"$50.00"}
                    attributeSets={attributeSets}
                    quantity={1}
                    imgUrl={
                        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg"
                    }
                />
                <CartItem
                    title="Product"
                    price={"$50.00"}
                    attributeSets={attributeSets}
                    quantity={1}
                    imgUrl={
                        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg"
                    }
                />
            </div>

            <div className="mt-8 flex justify-between">
                <p className="text-lg font-medium roboto">Total</p>
                <p className="subtitle">$200.00</p>
            </div>

            <div className="mt-8">
                <button className="btn btn-primary py-2">place order</button>
            </div>
        </Modal>
    );
};
