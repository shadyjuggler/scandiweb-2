const GRAPHQL_ENDPOINT = "http://localhost:8000/graphql";

export async function fetchGraphQL<T>(
    query: string,
    variables: Record<string, any> = {}
): Promise<T> {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);

    return result.data;
}
