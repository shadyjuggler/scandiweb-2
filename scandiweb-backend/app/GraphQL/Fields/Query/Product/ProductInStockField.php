<?php

namespace App\GraphQL\Fields\Query\Product;

use GraphQL\Type\Definition\Type;

class ProductInStockField
{
    public static function config(): array
    {
        return [
            'type' => Type::boolean(),
            'resolve' => fn($product) => (bool)$product['in_stock'],
        ];
    }
}