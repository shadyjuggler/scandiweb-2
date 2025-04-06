import React, { createContext, useContext } from "react";
import { useQueryService } from "../hooks/useQueryService";
import { ProductService } from "../graphql/services/ProductService";
import { ProductType } from "../types";

type ProductContextType = {
    products: ProductType[] | null;
    isLoading: boolean;
    error: string | null;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, isLoading, error } = useQueryService(["products"], () =>
        ProductService.allProducts()
    );

    return (
        <ProductContext.Provider
            value={{
                products: data?.products || null,
                isLoading,
                error,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
