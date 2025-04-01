const body = (query, variables = null) => ({ query, variables });

export const categories = () => {
    const query = `
        query { categories }
    `;

    return body(query);
}

export const products = (category) => {
    const query = `
        query ($category: String!) {
            products (category: $category) {
                id
                name
                thumbnail
                category_id
                in_stock
                discount
                price {
                    amount
                    currency {
                        symbol
                    }
                }
            }
        }
    `;
    const variables = { category };

    return body(query, variables);
}

export const productDetails = (productId) => {
    const query = `
        query ($productId: ID!) {
            product (id: $productId) {
                id
                gallery
                description
                attributes {
                    id
                    name
                    type
                    items {
                        value
                        displayValue: display_value
                    }
                }
            }
        }
    `;
    const variables = { productId };

    return body(query, variables);
}

export const addProduct = (order) => {
    const query = `
        mutation ($order: Order!) {
            addOrder (order: $order)
        }
    `

    const variables = { order }

    return body(query, variables)
}