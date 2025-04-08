// src/context/CategoryContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { CartProduct, ProductType } from "../types";
import { useState } from "react";

import { arraysEqual } from "../styles/utils/arraysEqual";

type CartContextType = {
    cartProducts: CartProduct[];
    total: number;
    addToCart: (
        product: ProductType,
        productSelectedAttributes: number[]
    ) => void;
    increaseQuantity: (
        productId: string,
        productSelectedAttributes: number[]
    ) => void;
    decreaseQuantity: (
        productId: string,
        productSelectedAttributes: number[]
    ) => void;
    removeFromCart: (
        productId: string,
        productSelectedAttributes: number[]
    ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    const addToCart = (
        product: ProductType,
        productSelectedAttributes: number[]
    ) => {
        setCartProducts((prev) => {
            // Look for product dublicates with same attributes, save refference of CartProduct object to variable 'existing'
            const existing = prev.find(
                (p) =>
                    p.product.id === product.id && // Fall back if id's not same
                    arraysEqual(
                        p.productSelectedAttributes,
                        productSelectedAttributes
                    ) // Check attributes if id's are equal
            );

            for (const product of prev) {
                console.log(
                    product.productSelectedAttributes,
                    productSelectedAttributes
                );
            }

            if (existing) {
                // Increase quantity if same product with same attributes

                return prev.map((p) =>
                    // Check object refferences
                    p === existing ? { ...p, quantity: p.quantity + 1 } : p
                );
            }

            return [
                ...prev,
                { product, quantity: 1, productSelectedAttributes },
            ];
        });
    };

    const removeFromCart = (
        productId: string,
        productSelectedAttributes: number[]
    ) => {
        setCartProducts((prev) =>
            prev.filter(
                (p) =>
                    !(
                        p.product.id === productId &&
                        arraysEqual(
                            p.productSelectedAttributes,
                            productSelectedAttributes
                        )
                    )
            )
        );
    };

    const increaseQuantity = (
        productId: string,
        productSelectedAttributes: number[]
    ) => {
        setCartProducts((prev) =>
            prev.map((p) =>
                p.product.id === productId &&
                arraysEqual(
                    p.productSelectedAttributes,
                    productSelectedAttributes
                )
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            )
        );
    };

    const decreaseQuantity = (
        productId: string,
        productSelectedAttributes: number[]
    ) => {
        setCartProducts((prev) =>
            prev.flatMap((p) => {
                if (
                    p.product.id === productId &&
                    arraysEqual(
                        p.productSelectedAttributes,
                        productSelectedAttributes
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

    const total = useMemo(() => {
        return cartProducts.reduce((a, cartProduct) => {
            const price = cartProduct.product.prices?.[0]?.amount ?? 0;
            return Number((a + price * cartProduct.quantity).toFixed(2));
        }, 0);
    }, [cartProducts]);

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                total,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
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
