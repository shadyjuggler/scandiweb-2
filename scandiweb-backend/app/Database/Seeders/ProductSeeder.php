<?php

namespace App\Database\Seeders;

use App\Models\Product;
use App\Database\Seeder;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function __construct(private array $data) {}

    public function run(): void
    {

        $this->log("Seeding categories...");

        foreach ($this->data['categories'] as $item) {
            // skip 'all' category name, isn't actually real category
            if ($item['name'] == 'all') continue;

            (new Category)->firstOrCreate(['name' => $item['name']]);
        }

        $categories = (new Category)->all();

        $this->log("Seeding products...");

        foreach ($this->data['products'] as $productData) {
            (new Product)->firstOrCreate([
                'id' => $productData['id'],
                'name' => $productData['name'],
                'description' => $productData['description'],
                'in_stock' => (int)$productData['inStock'],
                'brand' => $productData['brand'],
                'category_id' => array_find($categories, fn($category) => $category['name'] == $productData['category'])['id']
            ]);
        }
    }
}
