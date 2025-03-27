<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\PriceField;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Category;
use App\Models\Price;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => fn () => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::string(),
                'description' => Type::string(),
                'inStock' => [
                    'type' => Type::boolean(),
                    'resolve' => fn($product) => (bool)$product['in_stock'],
                ],
                'brand' => Type::string(),
                'category' => [
                    'type' => Type::string(),
                    'resolve' => fn($product) => (new Category())->find($product['category_id'])['name'] ?? null
                ],
                'prices' => PriceField::config()
            ]
        ]);
    }
}