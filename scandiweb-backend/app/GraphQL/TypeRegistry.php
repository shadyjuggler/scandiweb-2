<?php

namespace App\GraphQL;

use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CategoryType;

class TypeRegistry
{
    protected static array $instances = [];

    public static function product(): ProductType
    {
        return self::$instances['Product'] ??= new ProductType();
    }

    public static function price(): PriceType
    {
        return self::$instances['Price'] ??= new PriceType();
    }

    public static function category(): CategoryType
    {
        return self::$instances['Category'] ??= new CategoryType();
    }
}
