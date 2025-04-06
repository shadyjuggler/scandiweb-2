const GRAPHQL_ENDPOINT = "http://localhost:8000/graphql";

/**
 * GraphQL fetcher.
 * 
 * @template T - Expected response data shape
 * @param query - GraphQL query or mutation string
 * @param variables - Optional variables object to be passed with the query
 * @returns Promise<T> - Resolves with parsed `data` object or throws on GraphQL error
 * 
 * @throws Error - Throws the first error from GraphQL `errors` array
 * 
 * @example
 * const query = `query getProductById($id: ID!) {
 *   product(id: $id) {
 *     id
 *     name
 *     price {
 *       amount
 *     }
 *   }
 * }`;
 * const data = await fetchGraphQL<{ product: Product }>(query, { id: "ps-5" });
 */
export async function fetchGraphQL<T>(
    query: string,
    variables: Record<string, any> = {}
): Promise<T> {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    // Parse the JSON response
    const result = await response.json();

    // If the GraphQL response contains errors, throw the first error message
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    // Return only the 'data' portion of the GraphQL response
    return result.data;
}
