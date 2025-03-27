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

    public function getWithValuesByProductId(string $productId): array
    {
        $query = "
            SELECT value, type, display_value, name 
            from product_attributes
            JOIN attribute_items ON product_attributes.attribute_item_id = attribute_items.id
            JOIN attributes ON product_attributes.attribute_id = attributes.id 
            WHERE product_attributes.product_id = :product_id;
        ";

        $stmt = DB::pdo()->prepare($query);
        $stmt->execute(['product_id' => $productId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
