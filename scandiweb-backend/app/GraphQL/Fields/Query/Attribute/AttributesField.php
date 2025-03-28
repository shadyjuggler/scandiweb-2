<?php

namespace App\GraphQL\Fields\Query\Attribute;

use App\GraphQL\TypeRegistry;
use App\Models\Attribute;
use GraphQL\Type\Definition\Type;

class AttributesField
{
    public static function config(): array
    {
        return [
            'type' => fn () => Type::listOf(TypeRegistry::attribute()),
            'resolve' => fn() => (new Attribute)->all()
        ];
    }
}