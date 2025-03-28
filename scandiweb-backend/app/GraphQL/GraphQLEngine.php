<?php

namespace App\GraphQL;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;

/**
 * Class GraphQLEngine
 *
 * Process and handles incoming GraphQL HTTP requests.
 */
class GraphQLEngine
{
    /**
     * Parses the incoming request, builds the schema, and executes the GraphQL query.
     *
     * @return array The response array from GraphQL execution.
     *
     * @throws \RuntimeException if the input stream cannot be read.
     */
    public function handleRequest(): array
    {
        $schema = (new SchemaFactory())->build();

        $rawInput = file_get_contents('php://input');
        if (!$rawInput) {
            throw new \RuntimeException('Failed to get php://input');
        }

        $input = json_decode($rawInput, true);
        $query = $input['query'] ?? null;
        $variables = $input['variables'] ?? [];

        $result = GraphQLBase::executeQuery(
            $schema,
            $query,
            null,
            null,
            $variables
        );

        return $result->toArray();
    }
}
