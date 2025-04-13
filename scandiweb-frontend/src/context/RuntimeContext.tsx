import React, { createContext, useContext, useEffect, useState } from "react";
import { useCategories } from "./CategoryContext";

import { productToAttributeRecords } from "../utils/productToAttributeRecords";

import * as types from "../types/context/runtime";

type RuntimeContextType = {
    activeCategory: string | null;
    setActiveCategory: (categoryName: string) => void;

    selectedAttributeItems: Record<number, number>;
    setDefaultSelectedAttributeItems: types.SetDefaultSelectedAttributeItems;
    updateSelectedAttributeItems: types.UpdateSelectedAttributeItems;
};

const RuntimeContext = createContext<RuntimeContextType | undefined>(undefined);

export const RuntimeProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    // Runtime resources
    const { categories } = useCategories();

    // Runtime state
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [selectedAttributeItems, setSelectedAttributeItems] = useState<
        Record<number, number>
    >({});

    useEffect(() => {
        if (categories) {
            setActiveCategory(categories[0].name);
        }
    }, [categories]);

    const setDefaultSelectedAttributeItems: types.SetDefaultSelectedAttributeItems =
        (product) => {
            setSelectedAttributeItems(
                productToAttributeRecords(product, false),
            );
        };

    const updateSelectedAttributeItems: types.UpdateSelectedAttributeItems = (
        attribute_id,
        attribute_item_id
    ) => {
        setSelectedAttributeItems((prev) => {
            return { ...prev, [attribute_id]: attribute_item_id };
        });
    };

    return (
        <RuntimeContext.Provider
            value={{
                activeCategory,
                setActiveCategory,
                selectedAttributeItems,
                setDefaultSelectedAttributeItems,
                updateSelectedAttributeItems,
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
