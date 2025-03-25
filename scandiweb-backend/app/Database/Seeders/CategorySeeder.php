<?php

namespace App\Database\Seeders;

use App\Models\Category;

class CategorySeeder {
    public static function run(): void {
        $category = new Category;

        $category->firstOrCreate(['name' => 'tech']);
        $category->firstOrCreate(['name' => 'clothes']);
    }
}
