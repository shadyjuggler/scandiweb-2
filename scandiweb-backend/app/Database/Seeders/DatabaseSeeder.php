<?php

namespace App\Database\Seeders;

class DatabaseSeeder {
    public static function run(): void {
        echo "Running DatabaseSeeder...\n";

        CategorySeeder::run();
        ProductSeeder::run();

        echo "All seeders executed.\n";
    }
}
