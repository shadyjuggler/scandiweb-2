<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\Product\ProductAttributesField;
use App\GraphQL\Fields\Query\Product\ProductCategoryField;
use App\GraphQL\Fields\Query\Product\ProductGalleryField;
use App\GraphQL\Fields\Query\Product\ProductInStockField;
use App\GraphQL\Fields\Query\Product\ProductPriceField;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

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
                'prices' => ProductPriceField::config()
            ]
        ]);
    }
}