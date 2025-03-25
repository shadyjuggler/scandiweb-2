<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Database\MigrationRunner;
use App\Database\Seeders\DatabaseSeeder;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$runner = new MigrationRunner();

$action = $argv[1] ?? 'run';

match ($action) {
    'run'      => $runner->run(),
    'seed'     => seedDatabase($runner),
    'wipe'     => $runner->wipe(),
    default    => print("Unknown command: $action\n")
};

function seedDatabase(MigrationRunner $runner): void {
    echo "Running migrations first...\n";
    $runner->run();

    echo "Running DatabaseSeeder...\n";
    (new DatabaseSeeder)->run();
    echo "All seeders executed.\n";
}
