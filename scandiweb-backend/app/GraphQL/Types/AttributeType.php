<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\Product\ProductAttributeItemsField;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => fn() => [
                'attribute_id' => Type::int(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => ProductAttributeItemsField::config()
            ],
        ]);
    }
}
