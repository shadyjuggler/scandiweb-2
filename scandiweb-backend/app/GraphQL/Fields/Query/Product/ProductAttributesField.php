<?php

namespace App\GraphQL\Fields\Query\Product;

use GraphQL\Type\Definition\Type;
use App\GraphQL\TypeRegistry;
use App\Models\ProductAttribute;

class ProductAttributesField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::attribute()),
            'resolve' => function ($product) {
                $attributes =  (new ProductAttribute())
                    ->distinct()
                    ->select(['attributes.id as attribute_id', 'attributes.name', 'attributes.type'])
                    ->join('attributes', 'attribute_id', 'id')
                    ->where('product_attributes.product_id', '=', $product['id'])
                    ->get();

                // Insert 'product_id' in each attribute record to grab it in 'ProductAttributeItemsField'
                return array_map(fn($attr) => [...$attr, 'product_id' => $product['id']], $attributes);
            }
        ];
    }
}
