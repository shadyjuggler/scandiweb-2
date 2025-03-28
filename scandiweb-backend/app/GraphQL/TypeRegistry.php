<?php

namespace App\GraphQL;

use App\GraphQL\Types\AttributeItemType;
use App\GraphQL\Types\AttributeSetType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ImageType;

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

    public static function image(): ImageType
    {
        return self::$instances['Image'] ??= new ImageType();
    }
    
    public static function attribute(): AttributeType
    {
        return self::$instances['Attribute'] ??= new AttributeType();
    }

    public static function attributeItem(): AttributeItemType
    {
        return self::$instances['AttributeItem'] ??= new AttributeItemType();
    }
}
