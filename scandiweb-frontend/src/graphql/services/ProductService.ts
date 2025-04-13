import { fetchGraphQL } from "../client";

import { ProductType } from "../../types/resource";

export class ProductService {
    static async allProducts() {
        const query = `
            query Products {
                products {
                    id
                    brand
                    description
                    name
                    inStock
                    attributes {
                        attribute_id
                        name
                        type
                        items {
                            attribute_item_id
                            display_value
                            value
                        }
                    }
                    category {
                        id
                        name
                    }
                    gallery {
                        id
                        url
                        position
                    }
                    prices {
                        id
                        amount
                        currency {
                            symbol
                            label
                        }
                    }
                }
            }
        `;

        return fetchGraphQL<{
            products: ProductType[];
        }>(query);
    }

    // 'getProductById' not used in current version
    //  left as example of service function with variable
    static async getProductById(id: string) {
        const query = `
        query Product($id: String!) {
            product(id: $id) {
                id
                brand
                description
                name
                inStock
                category {
                    id
                    name
                }
            }
        }
        `;

        return fetchGraphQL<{
            product: ProductType;
        }>(query, { id: id });
    }
}
