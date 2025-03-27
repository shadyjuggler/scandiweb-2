<?php

namespace App\GraphQL\Fields\Query;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\ProductType;
use App\Models\Product;

class ProductField
{
    public static function config(): array
    {
        return [
            'type' => TypeRegistry::product(),
            'args' => [
                'id' => Type::nonNull(Type::string())
            ],
            'resolve' => fn($root, $args) => (new Product())->find($args['id'])
        ];
    }
}