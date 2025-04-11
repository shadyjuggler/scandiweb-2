<?php

namespace App\Models;

use App\Database\Model;

class Order extends Model {
    protected string $table = 'orders';
    protected array $fillable = ['created_at', 'currency', 'total_amount'];
}