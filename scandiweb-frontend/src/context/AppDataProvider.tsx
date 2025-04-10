import React from "react";
import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { CartProvider } from "./CartContext";
import { ModalProvider } from "./ModalContext";
import { RuntimeProvider } from "./RunTimeContext";

// General Provider component to combine all resource contexts, just thinking about future ;)

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
