<?php

namespace App\Models;

use App\Database\Model;

class Price extends Model {
    protected string $table = "product_prices";

    protected array $fillable = [
        'id',
        'amount',
        'currency',
        'product_id'
    ];
}