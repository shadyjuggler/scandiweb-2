<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\CurrencyField;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Currency;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => fn () => [
                'amount' => Type::float(),
                'currency' => CurrencyField::config()
            ]
        ]);
    }
}