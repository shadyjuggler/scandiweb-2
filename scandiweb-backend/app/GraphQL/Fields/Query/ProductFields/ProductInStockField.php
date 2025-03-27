<?php

namespace App\GraphQL\Fields\Query\ProductFields;

use App\GraphQL\TypeRegistry;
use App\GraphQL\Types\CategoryType;
use App\Models\Category;
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