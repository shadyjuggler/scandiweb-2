<?php

namespace App\Models;

use App\Database\Model;

class AttributeItem extends Model {
    protected string $table = "attribute_items";

    protected array $fillable = [
        'attribute_id',
        'display_value',
        'value'
    ];
}