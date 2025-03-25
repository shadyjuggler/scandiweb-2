<?php

namespace App\Database\Seeders;

use App\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $data = $this->loadJsonData('data.json')['data'];

        (new ProductSeeder($data))->run();
    }
}
