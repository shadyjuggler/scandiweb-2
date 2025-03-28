<?php

namespace App\GraphQL\Fields\Query\Category;

use App\GraphQL\TypeRegistry;
use App\Models\Category;
use GraphQL\Type\Definition\Type;

class CategoriesField
{
    public static function config(): array
    {
        return [
            'type' => fn () => Type::listOf(TypeRegistry::category()),
            'resolve' => fn() => (new Category())->all()
        ];
    }
}