<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\Currency\CurrencyField;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => fn () => [
                'id' => Type::int(),
                'amount' => Type::float(),
                'currency' => CurrencyField::config()
            ]
        ]);
    }
}