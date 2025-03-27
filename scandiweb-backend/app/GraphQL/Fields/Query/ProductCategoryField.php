<?php

namespace App\GraphQL\Fields\Query;

use App\GraphQL\TypeRegistry;
use App\GraphQL\Types\CategoryType;
use App\Models\Category;
use GraphQL\Type\Definition\Type;

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