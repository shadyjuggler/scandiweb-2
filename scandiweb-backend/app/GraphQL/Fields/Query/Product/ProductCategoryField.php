<?php

namespace App\GraphQL\Fields\Query\Product;

use App\GraphQL\TypeRegistry;
use App\Models\Category;

class ProductCategoryField
{
    public static function config(): array
    {
        return [
            'type' => TypeRegistry::category(),
            'resolve' => fn($product) => (new Category())->find($product['category_id'])
        ];
    }
}