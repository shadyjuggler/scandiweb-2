<?php

namespace App\GraphQL\Fields\Query;

use App\GraphQL\TypeRegistry;
use App\GraphQL\Types\PriceType;
use GraphQL\Type\Definition\Type;
use App\Models\Price;

class PriceField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::product()),
            'resolve' => fn($product) => (new Price())->where('product_id', '=', $product['id'])->get()
        ];
    }
}