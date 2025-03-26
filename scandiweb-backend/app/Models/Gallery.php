<?php

namespace App\Models;

use App\Database\Model;

class Gallery extends Model {
    protected string $table = "product_gallery";

    protected array $fillable = [
        'id',
        'url',
        'position',
        'product_id'
    ];
}