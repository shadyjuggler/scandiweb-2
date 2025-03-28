<?php

namespace App\GraphQL\Fields\Query;

use App\GraphQL\TypeRegistry;
use App\Models\Attribute;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;

class AttributeField
{
    public static function config(): array
    {
        return [
            'type' => fn() => TypeRegistry::attribute(),
            'args' => [
                'id' => Type::nonNull(Type::int()),
            ],
            'resolve' => fn ($_, $args) => (new Attribute)->find($args['id'])
        ];
    }
}
