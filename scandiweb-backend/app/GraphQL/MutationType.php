<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Fields\Mutation\CreateOrderField;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => fn() => [
                'createOrder' => CreateOrderField::config(),
            ],
        ]);
    }
}
