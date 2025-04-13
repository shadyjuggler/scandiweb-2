// All field non-undefined, because initially all field planned to be fetched

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

export type OrderProductInput = {
    product_id: string;
    quantity: number;
    selected_attribute_item_ids: number[];
};

export type OrderType = {
    currency: string;
    total: number;
    products: OrderProductInput[];
};
