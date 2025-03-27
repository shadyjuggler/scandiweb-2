<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\ProductAttributesField;
use App\GraphQL\Fields\Query\PriceField;
use App\GraphQL\Fields\Query\ProductCategoryField;
use App\GraphQL\Fields\Query\ProductGalleryField;
use App\GraphQL\Fields\Query\ProductInStockField;
use App\GraphQL\TypeRegistry;
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
                'attributes' => ProductAttributesField::config(),
                'brand' => Type::string(),
                'category' => ProductCategoryField::config(),
                'description' => Type::string(),
                'gallery' => ProductGalleryField::config(),
                'name' => Type::string(),
                'inStock' => ProductInStockField::config(),
                'prices' => PriceField::config()
            ]
        ]);
    }
}