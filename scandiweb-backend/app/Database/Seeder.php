<?php

namespace App\Database;

use Dom\Implementation;

abstract class Seeder
{
    /**
     * Run the seeder logic.
     *
     * @return void
     */
    abstract public function run(): void;

    /**
     * Optional helper to log to console.
     *
     * @param string $message
     * @return void
     */
    protected function log(string $message): void {
        $parts = explode('\\', static::class);
        echo '[' . end($parts) . ']: ' . $message . "\n";
    }

    protected function loadJsonData(string $filename) {
        $path = __DIR__ . '/../assets/' . $filename;

        if (!file_exists($path)) {
            throw new \RuntimeException("Data for seeding was not found: {$filename} !");
        }
    
        $json = file_get_contents($path);
        return json_decode($json, true, 512, JSON_THROW_ON_ERROR);
    }
}
