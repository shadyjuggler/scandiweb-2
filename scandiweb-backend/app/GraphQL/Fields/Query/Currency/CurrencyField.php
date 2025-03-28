<?php

namespace App\GraphQL\Fields\Query\Currency;

use App\GraphQL\Types\CurrencyType;
use App\Models\Currency;

class CurrencyField
{
    public static function config(): array
    {
        return [
            'type' => fn () => new CurrencyType,
            'resolve' => fn($price) => (new Currency())->firstWhere('label', $price['currency'])
        ];
    }
}