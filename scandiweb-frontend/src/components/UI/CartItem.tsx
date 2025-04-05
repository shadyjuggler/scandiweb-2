import { AttributeSetType } from "../../types";

import { SwatchAttributesSet } from "./SwatchAttributesSet";
import { TextAttributesSet } from "./TextAttributesSet";

interface CartItemProps {
    title: string;
    price: string;
    attributeSets: AttributeSetType[];
    quantity: number;
    imgUrl: string;
}

export const CartItem: React.FC<CartItemProps> = ({
    title,
    price,
    quantity,
    attributeSets,
    imgUrl,
}) => {

    return (
        <div className="flex gap-4">
            <div className="flex flex-col w-full min-w-[125px]">
                <p className="font-light">{title}</p>
                <p className="mt-2 font-medium">{price}</p>
                <div className="flex flex-col gap-1 pointer-events-none">
                    {attributeSets.map((set) => {
                        return (
                            <div className="mt-1">
                                <p className="text-sm">
                                    {set.name ?? "unknown"}
                                </p>
                                <div className="mt-1">
                                    {!set.type ? (
                                        <p className="text-sm">
                                            Attribute type not provided
                                        </p>
                                    ) : set.type === "swatch" ? (
                                        <SwatchAttributesSet
                                            isSmall={true}
                                            attributeSetItems={
                                                set.attributeSetItems
                                            }
                                        />
                                    ) : set.type === "text" ? (
                                        <TextAttributesSet
                                            isSmall={true}
                                            attributeSetItems={
                                                set.attributeSetItems
                                            }
                                        />
                                    ) : (
                                        <p className="text-sm">
                                            Unknown attribute type provided
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-6 flex flex-col justify-between">
                <button className="btn-quantity">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 1V9"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M1 5H9"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
                <p className="font-medium text-center">{quantity}</p>
                <button className="btn-quantity">
                    <svg
                        width="10"
                        height="2"
                        viewBox="0 0 10 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1H9"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <img className="object-contain" src={imgUrl} alt={"product-image"} />
            </div>
        </div>
    );
};
