<?php

namespace App\GraphQL\Fields\Query;

use App\GraphQL\TypeRegistry;
use App\GraphQL\Types\CategoryType;
use App\Models\Category;
use App\Models\Gallery;
use GraphQL\Type\Definition\Type;

class ProductGalleryField
{
    public static function config(): array
    {
        return [
            'type' => Type::listOf(TypeRegistry::image()),
            'resolve' => fn($product) => (new Gallery)->where("product_id", "=", $product["id"])->get(),
        ];
    }
}