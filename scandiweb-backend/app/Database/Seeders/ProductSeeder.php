<?php

namespace App\Database\Seeders;

use App\Models\Product;
use App\Database\DB;

class ProductSeeder {
    public static function run(): void {
        $pdo = DB::pdo();

        $product = new Product();
        $product->firstOrCreate([
            'id' => 'ps-5',
            'name' => 'PlayStation 5',
            'description' => '<p>Great gaming console</p>',
            'in_stock' => true,
            'brand' => 'Sony',
            'category_id' => 2
        ]);
    }
}
