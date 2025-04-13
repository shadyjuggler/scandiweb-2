import { useCart } from "../../context/CartContext";
import { OrderService } from "../../graphql/services/OrderService";
import { useMutationService } from "../../hooks/useMutationService";
import { useState } from "react";

export const MakeOrderBtn: React.FC<{ text: string }> = ({ text }) => {
    const {
        cartProducts,
        stats: { totalPrice },
        clearCart,
    } = useCart();

    const { mutate, isLoading, error } = useMutationService(
        OrderService.createOrder
    );

    const [btnMessage, setBtnMessage] = useState<string>(text);

    const handleCheckout = async () => {
        const products = cartProducts.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            selected_attribute_item_ids: Object.values(
                item.selectedAttributeItems
            ),
        }));

        const currency =
            cartProducts[0]?.product.prices[0]?.currency.label ?? "USD";

        const order = {
            currency,
            total: totalPrice,
            products,
        };

        console.log(order);

        const result = await mutate(order);

        if (result?.createOrder) {
            clearCart();
            setBtnMessage("Order placed!");
        }
    };

    return (
        <button
            disabled={cartProducts.length === 0}
            onClick={handleCheckout}
            className="btn btn-primary py-2"
        >
            {isLoading
                ? "Loading..."
                : error
                ? "Somthing went wrong!"
                : btnMessage}
        </button>
    );
};
