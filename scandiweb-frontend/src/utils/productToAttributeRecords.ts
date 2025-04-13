import { ProductType } from "../types/resource";

/**
 * Used init or prefill selected attribute items for a given product.
 *
 * @param product - The product containing a list of attribute sets
 * @param realValues - Use real attribute_item_ids (true) or non-selected representation (-1)
 * @returns A record where each key is an attribute_d, and each value is attribute_items_id or -1:
 */
export const productToAttributeRecords = (
    product: ProductType,
    realValues: boolean
): Record<number, number> => {
    const records: Record<number, number> = {};

    for (const attribute of product.attributes) {
        records[attribute.attribute_id] = realValues
            ? attribute.items[0].attribute_item_id
            : -1;
    }

    return records;
};
