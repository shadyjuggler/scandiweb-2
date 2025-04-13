import { ProductType } from "../types/resource";

export const productToAttributeRecords = (product: ProductType): Record<number, number> => {
    const records: Record<number, number> = {};

    for (const attribute of product.attributes) {
        records[attribute.attribute_id] = attribute.items[0].attribute_item_id;
    }

    return records;
};
