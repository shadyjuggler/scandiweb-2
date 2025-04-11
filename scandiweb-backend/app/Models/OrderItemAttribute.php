<?php

namespace App\Models;

use App\Database\Model;

class OrderItemAttribute extends Model {
    protected string $table = 'order_item_attributes';
    protected array $fillable = ['order_item_id', 'attribute_item_id'];
}