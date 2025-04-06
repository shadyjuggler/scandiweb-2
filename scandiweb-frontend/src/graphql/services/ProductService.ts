import { fetchGraphQL } from "../client";

import { ProductType } from "../../types";

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
                        name
                        type
                        items {
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

    static async getProductById(id: string) {
        const query = `
        query Product($id: String!) {
            product(id: $id) {
                id
                brand
                description
                name
                inStock
                attributes {
                    name
                    type
                    items {
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
            product: ProductType;
        }>(query, { id: id });
    }
}
