<?php

namespace App\GraphQL\Fields\Query\Product;

use GraphQL\Type\Definition\Type;
use App\GraphQL\TypeRegistry;
use App\Models\ProductAttribute;

class ProductAttributeItemsField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::attributeItem()),
            'resolve' => function ($attribute) {
                return (new ProductAttribute)
                    ->select(["attribute_items.id as attribute_item_id", "display_value", "value"])
                    ->join("attribute_items", "attribute_item_id", "id")
                    ->where("product_attributes.product_id", "=", $attribute['product_id'])
                    ->where("product_attributes.attribute_id", "=", $attribute['attribute_id'])
                    ->get();
            }
        ];
    }
}
