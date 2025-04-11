import React from "react";
import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { CartProvider } from "./CartContext";
import { ModalProvider } from "./ModalContext";
import { RuntimeProvider } from "./RuntimeContext";

// General Provider component to combine all resource contexts

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <CategoryProvider>
            <ProductProvider>
                <ModalProvider>
                    <CartProvider>
                        <RuntimeProvider>{children}</RuntimeProvider>
                    </CartProvider>
                </ModalProvider>
            </ProductProvider>
        </CategoryProvider>
    );
};
