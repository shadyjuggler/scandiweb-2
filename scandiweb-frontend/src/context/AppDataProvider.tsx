import React from "react";
import { ProductProvider } from "./ProductContext";
import { CategoryProvider } from "./CategoryContext";
import { CartProvider } from "./CartContext";

// General Provider component to combine all resource contexts, just thinking about future ;)

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ProductProvider>
            <CategoryProvider>
                <CartProvider>{children}</CartProvider>
            </CategoryProvider>
        </ProductProvider>
    );
};
