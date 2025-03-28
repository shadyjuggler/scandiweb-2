<?php

namespace App\GraphQL\Fields\Query\Product;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\Type;
use App\Models\Product;

class ProductsField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::product()),
            'resolve' => fn() => (new Product())->all()
        ];
    }
}
