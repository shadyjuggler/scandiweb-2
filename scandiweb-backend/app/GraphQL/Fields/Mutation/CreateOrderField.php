<?php

namespace App\GraphQL\Fields\Mutation;

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\Type;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemAttribute;

class CreateOrderField
{
    public static function config(): array
    {
        return [
            'type' => Type::boolean(),
            'args' => [
                'currency' => Type::nonNull(Type::string()),
                'total' => Type::nonNull(Type::float()),
                'products' => Type::nonNull(Type::listOf(TypeRegistry::orderProductInput()))
            ],
            'resolve' => function ($_, $args) {
                $currency = $args['currency'];
                $products = $args['products'];
                $total = $args['total'];

                $orderId = (new Order())->create([
                    'currency' => $currency,
                    'total_amount' => $total
                ]);

                foreach ($products as $product) {
                    $orderItemId = (new OrderItem())->create([
                        'order_id' => $orderId,
                        'product_id' => $product['product_id'],
                        'quantity' => $product['quantity'],
                    ]);

                    foreach ($product['selected_attribute_item_ids'] as $attrItemId) {
                        (new OrderItemAttribute())->create([
                            'order_item_id' => $orderItemId,
                            'attribute_item_id' => $attrItemId
                        ]);
                    }
                }

                return true;
            }
        ];
    }
}
