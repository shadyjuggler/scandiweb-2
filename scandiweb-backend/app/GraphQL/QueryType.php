<?php

namespace App\GraphQL;

use App\GraphQL\Fields\Query\CategoriesField;
use App\GraphQL\Fields\Query\CategoryField;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Fields\Query\ProductsField;
use App\GraphQL\Fields\Query\ProductField;
use App\GraphQL\Types\ProductType;
use App\Models\Product;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => fn () => [
                'products' => fn () => ProductsField::config(),
                'product' => fn () => ProductField::config(),
                'categories' => fn () => CategoriesField::config(),
                'category' => fn () => CategoryField::config()
            ],
        ]);
    }
}