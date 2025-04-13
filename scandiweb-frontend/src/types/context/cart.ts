import { ProductType } from "../resource";

export type ModifyCartQuantity = (
  productId: string,
  selectedAttributeItems: Record<number, number>
) => void;

export type AddToCart = (
  product: ProductType,
  selectedAttributeItems: Record<number, number>
) => void;

export type RemoveFromCart = ModifyCartQuantity;

export type CartProduct = {
    product: ProductType,
    quantity: number,
    selectedAttributeItems: Record<number, number>
}