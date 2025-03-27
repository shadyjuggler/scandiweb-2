<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\ProductFields\ProductAttributesField;
use App\GraphQL\Fields\Query\ProductFields\ProductCategoryField;
use App\GraphQL\Fields\Query\ProductFields\ProductGalleryField;
use App\GraphQL\Fields\Query\ProductFields\ProductInStockField;
use App\GraphQL\Fields\Query\ProductFields\ProductPriceField;

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