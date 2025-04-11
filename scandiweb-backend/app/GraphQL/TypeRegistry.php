<?php

namespace App\GraphQL;

use App\GraphQL\Types\InputTypes\OrderProductInputType;
use App\GraphQL\Types\AttributeItemType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\ImageType;

/**
 * Class TypeRegistry
 *
 * Singleton-like access to all GraphQL types.
 */
class TypeRegistry
{
    /**
     * Array of instantiated GraphQL type objects.
     *
     * @var array<string, object>
     */
    protected static array $instances = [];

    /**
     * Get the singleton instance of ProductType.
     *
     * @return ProductType
     */
    public static function product(): ProductType
    {
        return self::$instances['Product'] ??= new ProductType();
    }

    /**
     * Get the singleton instance of PriceType.
     *
     * @return PriceType
     */
    public static function price(): PriceType
    {
        return self::$instances['Price'] ??= new PriceType();
    }

    /**
     * Get the singleton instance of CategoryType.
     *
     * @return CategoryType
     */
    public static function category(): CategoryType
    {
        return self::$instances['Category'] ??= new CategoryType();
    }

    /**
     * Get the singleton instance of ImageType.
     *
     * @return ImageType
     */
    public static function image(): ImageType
    {
        return self::$instances['Image'] ??= new ImageType();
    }

    /**
     * Get the singleton instance of AttributeType.
     *
     * @return AttributeType
     */
    public static function attribute(): AttributeType
    {
        return self::$instances['Attribute'] ??= new AttributeType();
    }

    /**
     * Get the singleton instance of AttributeItemType.
     *
     * @return AttributeItemType
     */
    public static function attributeItem(): AttributeItemType
    {
        return self::$instances['AttributeItem'] ??= new AttributeItemType();
    }

    /**
     * Get the singleton instance of AttributeItemType.
     *
     * @return OrderProductInputType
     */
    public static function orderProductInput(): OrderProductInputType
    {
        return self::$instances['OrderProductInputType'] ??= new OrderProductInputType();
    }
}
