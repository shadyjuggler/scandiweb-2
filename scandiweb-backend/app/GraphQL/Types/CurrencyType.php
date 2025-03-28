<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'fields' => fn () => [
                'symbol' => Type::string(),
                'label' => Type::string()
            ]
        ]);
    }
}