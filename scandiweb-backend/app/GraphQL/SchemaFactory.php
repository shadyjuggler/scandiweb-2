<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;

use App\GraphQL\QueryType;
use App\Types\MutationType;

class SchemaFactory
{
    public function build(): Schema
    {
        return new Schema([
            'query' => new QueryType()
        ]);
    }
}
