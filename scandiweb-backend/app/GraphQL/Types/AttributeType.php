<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => fn() => [
                'name' => Type::string(),
                'display_value' => Type::string(),
                'type' => Type::string(),
                'value' => Type::string(),
            ],
        ]);
    }
}
