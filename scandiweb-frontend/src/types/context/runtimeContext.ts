import { ProductType } from "../resource";

export type SetDefaultSelectedAttributeItems = (product: ProductType) => void;

export type UpdateSelectedAttributeItems = (
    attribute_id: number,
    attribute_item_id: number
) => void;
