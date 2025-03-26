<?php

namespace App\Database\Seeders;

use App\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
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
    }
}
