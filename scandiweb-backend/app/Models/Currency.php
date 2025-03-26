<?php

namespace App\Models;

use App\Database\Model;

class Currency extends Model {
    protected string $table = "currencies";

    protected array $fillable = [
        'label',
        'symbol',
    ];
}