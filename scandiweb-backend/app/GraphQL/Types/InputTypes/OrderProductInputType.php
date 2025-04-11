<?php

namespace App\GraphQL\Types\InputTypes;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderProductInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderProductInput',
            'fields' => [
                'product_id' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'selected_attribute_item_ids' => Type::listOf(Type::int())
            ]
        ]);
    }
}
