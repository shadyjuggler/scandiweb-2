<?php

namespace App\Database\Seeders;

use App\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {

        // Get prepared data
        $data = $this->loadJsonData('data.json')['data'];

        // Run all seeders
        (new CategoriesSeeder($data))->run();
        (new CurrenciesSeeder($data))->run();
        (new AttributesSeeder($data))->run();
        (new AttributeItemsSeeder($data))->run();
        (new ProductSeeder($data))->run();
    }
}
