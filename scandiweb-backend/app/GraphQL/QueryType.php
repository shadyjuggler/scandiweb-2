<?php

namespace App\GraphQL;

use App\GraphQL\Fields\Query\Attribute\AttributeField;
use App\GraphQL\Fields\Query\Attribute\AttributesField;
use App\GraphQL\Fields\Query\Category\CategoriesField;
use App\GraphQL\Fields\Query\Category\CategoryField;
use App\GraphQL\Fields\Query\Gallery\GalleryField;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Fields\Query\Product\ProductsField;
use App\GraphQL\Fields\Query\Product\ProductField;

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
                'category' => fn () => CategoryField::config(),

                'gallery' => fn () => GalleryField::config(),
                
                'attributes' => fn () => AttributesField::config(),
                'attribute' => fn () => AttributeField::config()
            ],
        ]);
    }
}