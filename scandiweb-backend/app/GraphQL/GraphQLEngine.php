<?php

namespace App\GraphQL;

use GraphQL\GraphQL as GraphQLBase;

class GraphQLEngine
{
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
            $this->getRootValue(),
            null,
            $variables
        );

        return $result->toArray();
    }

    private function getRootValue(): array
    {
        return ['prefix' => 'You said: '];
    }
}
