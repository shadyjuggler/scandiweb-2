<?php

namespace App\Models;

use App\Database\DB;
use App\Database\Model;

class Attribute extends Model
{
    protected string $table = "attributes";

    protected array $fillable = [
        'name',
        'type',
    ];
}
