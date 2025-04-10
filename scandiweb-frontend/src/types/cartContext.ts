import { ProductType } from "./resource";

export type ModifyCartQuantity = (
  productId: string,
  productSelectedAttributes: number[]
) => void;

export type AddToCart = (
  product: ProductType,
  productSelectedAttributes: number[]
) => void;

export type RemoveFromCart = ModifyCartQuantity;

export type CartProduct = {
    product: ProductType,
    quantity: number,
    productSelectedAttributes: number[]
}