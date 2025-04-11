// src/context/CategoryContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCategories } from "./CategoryContext";

type RuntimeContextType = {
    activeCategory: string | null;
    setActiveCategory: (categoryName: string) => void;
};

const RuntimeContext = createContext<RuntimeContextType | undefined>(undefined);

export const RuntimeProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    const { categories } = useCategories();

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        if (categories) {
            setActiveCategory(categories[0].name);
        }
    }, [categories]);

    return (
        <RuntimeContext.Provider
            value={{
                activeCategory,
                setActiveCategory,
            }}
        >
            {children}
        </RuntimeContext.Provider>
    );
};

export const useRuntime = (): RuntimeContextType => {
    const context = useContext(RuntimeContext);
    if (!context) {
        throw new Error("useRuntime must be used within a RuntimeProvider");
    }
    return context;
};
