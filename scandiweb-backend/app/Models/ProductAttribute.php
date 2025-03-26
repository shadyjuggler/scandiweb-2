<?php

namespace App\Models;

use App\Database\Model;

class ProductAttribute extends Model {
    protected string $table = "product_attributes";

    protected array $fillable = [
        'id',
        'product_id',
        'attribute_id',
        'attribute_item_id'
    ];
}