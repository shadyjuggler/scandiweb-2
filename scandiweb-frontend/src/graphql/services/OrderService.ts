// services/OrderService.ts

import { OrderType } from "../../types/order";
import { fetchGraphQL } from "../client";

export class OrderService {
    static async createOrder(
       order: OrderType
    ) {
        const {currency, total, products} = order;

        const mutation = `
            mutation CreateOrder($currency: String!, $total: Float!, $products: [OrderProductInput!]!) {
                createOrder(currency: $currency, total: $total, products: $products)
            }
        `;

        return fetchGraphQL<{ createOrder: boolean }>(mutation, {
            currency,
            total,
            products
        });
    }
}
