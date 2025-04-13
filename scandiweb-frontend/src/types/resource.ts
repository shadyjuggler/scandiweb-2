// Type fields are non-undefined, because all planned to be fetched from API

export type AttributeType = {
    attribute_item_id: number;
    displayValue: string;
    value: string;
};

export type AttributeSetType = {
    attribute_id: number;
    items: AttributeType[];
    name: string;
    type: "text" | "swatch";
};

export type CategoryType = {
    id: number;
    name: string;
};

export type ImageType = {
    id: number;
    url: string;
    postion: number;
};

export type CurrencyType = {
    symbol: string;
    label: string;
};

export type PriceType = {
    amount: number;
    currency: CurrencyType;
};

export type ProductType = {
    id: string;
    name: string;
    brand: string;
    inStock: boolean;
    description: string;
    category: CategoryType;
    attributes: AttributeSetType[];
    gallery: ImageType[];
    prices: PriceType[];
};
