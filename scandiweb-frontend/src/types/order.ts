export type OrderProductInputType = {
    product_id: string;
    quantity: number;
    selected_attribute_item_ids: number[];
};

export type OrderType = {
    currency: string;
    total: number;
    products: OrderProductInputType[];
};
