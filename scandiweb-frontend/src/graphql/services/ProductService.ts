import { fetchGraphQL } from "../client";

export class ProductService {
    static async allProducts() {
        const query = `
            query AllProducts {
                products {
                    id
                    name
                    prices {
                        amount
                        currency {
                            symbol
                        }
                    }
                    description
                    inStock
                }
            }
        `;

        return fetchGraphQL<{
            products: {
                id: string;
                name: string;
                description: string;
                inStock: boolean;
                prices: { amount: string; currency: { symbol: string } };
            };
        }>(query);
    }
  
}
