import { useCart } from "../../context/CartContext";
import { AttributeSet } from "./AttributeSet";
import { Minus, Plus } from "../Svg";
import { CartItemProps } from "../Interfaces";

export const CartItem: React.FC<CartItemProps> = ({
    id,
    title,
    price,
    quantity,
    attributeSets,
    selectedAttributeItems,
    imgUrl,
}) => {
    const { increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div className="flex gap-4">
            <div className="flex flex-col w-full min-w-[125px]">
                <p className="font-light">{title}</p>
                <p className="mt-2 font-medium">{price}</p>
                <div className="flex flex-col gap-1 pointer-events-none">
                    {attributeSets.map((set) => {
                        return (
                            <div key={set.name} className="mt-1">
                                <p className="text-sm">
                                    {set.name ?? "unknown"}
                                </p>
                                <div className="mt-1">
                                    {!set.type ? (
                                        <p className="text-sm">
                                            Attribute type not provided
                                        </p>
                                    ) : (
                                        <AttributeSet
                                            attribute_id={set.attribute_id}
                                            name={set.name}
                                            items={set.items}
                                            selectedAttributeItems={
                                                selectedAttributeItems
                                            }
                                            type={set.type}
                                            isSmall={true} // <= By this, we saing that attribute set will be displayed in Cart
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-6 flex flex-col justify-between">
                <button
                    data-testid="cart-item-amount-increase"
                    onClick={() => increaseQuantity(id, selectedAttributeItems)}
                    className="btn-quantity"
                >
                    <Plus />
                </button>
                <p
                    data-testid="cart-item-amount"
                    className="font-medium text-center"
                >
                    {quantity}
                </p>
                <button
                    data-testid="cart-item-amount-decrease"
                    onClick={() => decreaseQuantity(id, selectedAttributeItems)}
                    className="btn-quantity"
                >
                    <Minus />
                </button>
            </div>
            <div>
                <img
                    className="object-contain"
                    src={imgUrl}
                    alt={"product-image"}
                />
            </div>
        </div>
    );
};
