<?php

namespace App\Models;

use App\Database\Model;

class Product extends Model {
    protected string $table = "products";

    protected array $fillable = [
        'id',
        'name',
        'description',
        'in_stock',
        'brand',
        'category_id'
    ];
}