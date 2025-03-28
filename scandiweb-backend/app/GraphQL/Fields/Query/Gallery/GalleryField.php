<?php

namespace App\GraphQL\Fields\Query\Gallery;

use App\GraphQL\TypeRegistry;
use App\Models\Gallery;
use GraphQL\Type\Definition\Type;

class GalleryField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::image()),
            'args' => [
                'product_id' => Type::string()
            ],
            'resolve' => fn($_, $args) => (new Gallery)->where("product_id", "=", $args["product_id"])->get(),
        ];
    }
}