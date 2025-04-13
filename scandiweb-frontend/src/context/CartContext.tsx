import React, { createContext, useContext, useMemo } from "react";
import { useState } from "react";

import { entitiesEqual } from "../utils/entitiesEqual";

import * as types from "../types/context/cartContext";

type CartContextType = {
    cartProducts: types.CartProduct[];
    stats: {
        totalPrice: number;
        productQuantity: number;
    };
    addToCart: types.AddToCart;
    increaseQuantity: types.ModifyCartQuantity;
    decreaseQuantity: types.ModifyCartQuantity;
    removeFromCart: types.RemoveFromCart;
    clearCart: () => void
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartProducts, setCartProducts] = useState<types.CartProduct[]>([]);

    const addToCart: types.AddToCart = (product, selectedAttributeItems) => {
        setCartProducts((prev) => {
            // Look for product dublicates with same attributes, save refference of CartProduct object to variable 'existing'
            const existing = prev.find(
                (p) =>
                    p.product.id === product.id && // Fall back if id's not same
                    entitiesEqual(
                        p.selectedAttributeItems,
                        selectedAttributeItems
                    )
            );

            if (existing) {
                // Increase quantity if same product with same attributes

                return prev.map((p) =>
                    // Check object refferences
                    p === existing ? { ...p, quantity: p.quantity + 1 } : p
                );
            }

            return [
                ...prev,
                { product, quantity: 1, selectedAttributeItems },
            ];
        });
    };

    const removeFromCart: types.RemoveFromCart = (
        productId,
        selectedAttributeItems
    ) => {
        setCartProducts((prev) =>
            prev.filter(
                (p) =>
                    !(
                        p.product.id === productId &&
                        entitiesEqual(
                            p.selectedAttributeItems,
                            selectedAttributeItems
                        )
                    )
            )
        );
    };

    const increaseQuantity: types.ModifyCartQuantity = (
        productId,
        selectedAttributeItems
    ) => {
        setCartProducts((prev) =>
            prev.map((p) =>
                p.product.id === productId &&
                entitiesEqual(
                    p.selectedAttributeItems,
                    selectedAttributeItems
                )
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            )
        );
    };

    const decreaseQuantity: types.ModifyCartQuantity = (
        productId,
        selectedAttributeItems
    ) => {
        setCartProducts((prev) =>
            prev.flatMap((p) => {
                if (
                    p.product.id === productId &&
                    entitiesEqual(
                        p.selectedAttributeItems,
                        selectedAttributeItems
                    )
                ) {
                    if (p.quantity > 1) {
                        return { ...p, quantity: p.quantity - 1 };
                    } else {
                        return [];
                    }
                }
                return p;
            })
        );
    };

    const clearCart = () => setCartProducts([]);

    const stats = useMemo(() => {
        const totalPrice = cartProducts.reduce((a, cartProduct) => {
            const price = cartProduct.product.prices?.[0]?.amount ?? 0;
            return Number((a + price * cartProduct.quantity).toFixed(2));
        }, 0);

        const productQuantity = cartProducts.reduce((a, c) => {
            return a + c.quantity;
        }, 0);

        return { totalPrice, productQuantity };
    }, [cartProducts]);

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                stats,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
