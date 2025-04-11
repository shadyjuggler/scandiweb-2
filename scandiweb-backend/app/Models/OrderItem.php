<?php

namespace App\Models;

use App\Database\Model;

class OrderItem extends Model {
    protected string $table = 'order_items';
    protected array $fillable = ['order_id', 'product_id', 'quantity', 'unit_price', 'currency'];
}