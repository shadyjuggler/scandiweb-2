<?php

namespace App\Models;

use App\Database\Model;

class Category extends Model {
    protected string $table = "categories";

    protected array $fillable = [
        'id',
        'name'
    ];
}