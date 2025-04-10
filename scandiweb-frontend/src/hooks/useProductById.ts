import { useProducts } from "../context/ProductContext";
import { ProductType } from "../types/resource";

/**
 * Custom hook to get specific product by its id from context.
 * Returns null if products haven't loaded or do not exist.
 */
export const useProductById = (id: string): {
    product: ProductType | null;
    isLoading: boolean;
    error: string | null;
} => {
    const { products, isLoading, error } = useProducts();

    const product = products?.find((p) => p.id === id) ?? null;

    return {
        product,
        isLoading,
        error,
    };
};
