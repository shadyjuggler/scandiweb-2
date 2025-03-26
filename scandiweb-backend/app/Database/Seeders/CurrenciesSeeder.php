<?php

namespace App\Database\Seeders;

use App\Database\Seeder;
use App\Models\Currency;

class CurrenciesSeeder extends Seeder
{
    public function __construct(private array $data) {}

    public function run(): void
    {
        $this->log("Seeding currencies...");

        foreach ($this->data['products'] as $product) {
            foreach ($product['prices'] as $productPrice) {
                (new Currency)->firstOrCreate([
                    'label' => $productPrice['currency']['label'],
                    'symbol' => $productPrice['currency']['symbol']
                ]);
            }
        }
    }
}
