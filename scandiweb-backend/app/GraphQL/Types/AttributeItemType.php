<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeItemType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeItem',
            'fields' => fn() => [
                'attribute_item_id' => Type::int(),
                'display_value' => Type::string(),
                'value' => Type::string(),
            ],
        ]);
    }
}
