<?php

namespace App\GraphQL\Types;

use App\GraphQL\Fields\Query\CurrencyField;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Currency;

class ImageType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Image',
            'fields' => fn () => [
                'id' => Type::int(),
                'url' => Type::string(),
                'position' => Type::int()
            ]
        ]);
    }
}