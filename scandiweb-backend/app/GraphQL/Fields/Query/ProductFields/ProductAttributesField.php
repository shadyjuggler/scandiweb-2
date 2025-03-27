<?php

namespace App\GraphQL\Fields\Query\ProductFields;

use App\Models\Attribute;
use GraphQL\Type\Definition\Type;
use App\GraphQL\TypeRegistry;
use App\Models\ProductAttribute;

class ProductAttributesField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::attribute()),
            'resolve' => fn($product) => (new Attribute())->getWithValuesByProductId($product['id'])
        ];
    }
}
