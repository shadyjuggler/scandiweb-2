<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;

use App\Types\QueryType;
use App\Types\MutationType;

class SchemaFactory {
    public function build(): Schema {
        return new Schema(
            (new SchemaConfig())
                ->setQuery((new QueryType())->get())
                ->setMutation((new MutationType())->get())
        );
    }
}
