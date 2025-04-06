// All field non-undefined, because initially all field planned to be fetched

export type AttributeType = {
    displayValue: string,
    value: string,
    id: number | string,
};

export type AttributeSetType = {
    items: AttributeType[],
    name: string,
    type: "text" | "swatch"
};

export type CategoryType = {
    id: number,
    name: string
};

export type ImageType = {
    id: number,
    url: string,
    postion: number
};

export type CurrencyType = {
    symbol: string,
    label: string
};

export type PriceType = {
    amount: number,
    currency: CurrencyType
};

export type ProductType = {
    id: string,
    name: string,
    brand: string,
    inStock: boolean,
    description: string,
    category: CurrencyType
    attributes: AttributeSetType[]
    gallery: ImageType[]
    prices: PriceType[]
};