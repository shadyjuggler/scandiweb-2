// src/context/CategoryContext.tsx
import React, { createContext, useContext, useMemo } from "react";
import { useQueryService } from "../hooks/useQueryService";
import { CategoryService } from "../graphql/services/CategoryService";
import { CategoryType } from "../types/resource";

type CategoryContextType = {
    categories: CategoryType[] | null;
    isLoading: boolean;
    error: string | null;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
    undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, isLoading, error } = useQueryService(["categories"], () =>
        CategoryService.allCategories()
    );

    const extendedCategories = useMemo(() => {
        if (!data) return null;

        return [{ id: 0, name: "all" }, ...data.categories];
    }, [data]);

    return (
        <CategoryContext.Provider
            value={{
                categories: extendedCategories,
                isLoading,
                error,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoryProvider");
    }
    return context;
};
