<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;

use App\GraphQL\QueryType;
use App\GraphQL\MutationType;

/**
 * Class SchemaFactory
 *
 */
class SchemaFactory
{
    /**
     * Build and return the GraphQL schema.
     *
     * @return Schema The constructed GraphQL schema.
     */
    public function build(): Schema
    {
        return new Schema([
            'query' => new QueryType(),
            'mutation' => new MutationType()
        ]);
    }
}
