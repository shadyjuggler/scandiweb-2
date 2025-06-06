<?php

namespace App\GraphQL\Fields\Query\Category;

use App\GraphQL\TypeRegistry;
use App\Models\Category;
use GraphQL\Type\Definition\Type;

class CategoryField
{
    public static function config(): array
    {
        return [
            'type' => TypeRegistry::category(),
            'args' => [
                'id' => Type::int()
            ],
            'resolve' => fn($_, $args) => (new Category())->find($args['id'])
        ];
    }
}