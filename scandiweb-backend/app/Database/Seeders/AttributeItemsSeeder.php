<?php

namespace App\Database\Seeders;

use App\Database\Seeder;
use App\Models\Attribute;
use App\Models\AttributeItem;

class AttributeItemsSeeder extends Seeder
{
    public function __construct(private array $data) {}

    public function run(): void
    {
        $this->log("Seeding attribute items...");

        foreach ($this->data['products'] as $product) {
            foreach ($product['attributes'] as $attrSet) {
                // Find attribute by name 
                $attribute = (new Attribute())->firstWhere('name', $attrSet['name']);
                if (!$attribute) continue;

                foreach ($attrSet['items'] as $item) {
                    (new AttributeItem)->firstOrCreate([
                        'attribute_id' => $attribute['id'],
                        'display_value' => $item['displayValue'],
                        'value' => $item['value']
                    ]);
                }
            }
        }
    }
}
