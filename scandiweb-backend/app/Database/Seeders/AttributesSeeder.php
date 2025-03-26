<?php

namespace App\Database\Seeders;

use App\Database\Seeder;
use App\Models\Attribute;

class AttributesSeeder extends Seeder
{
    public function __construct(private array $data) {}

    public function run(): void
    {
        $this->log("Seeding attributes...");

        foreach ($this->data['products'] as $product) {
            foreach ($product['attributes'] as $productAttributes) {
                (new Attribute)->firstOrCreate([
                    'name' => $productAttributes['name'],
                    'type' => $productAttributes['type']
                ]);
            }
        }
    }
}
