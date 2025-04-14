<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Database\MigrationRunner;
use App\Database\Seeders\DatabaseSeeder;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$runner = new MigrationRunner();

$action = $argv[1] ?? 'run';

/**
 * Handle cli actions:
 * - run: simple migration execution
 * - seed: migrations + seeders
 * - wipe: drop all tables
 */
match ($action) {
    'run'      => $runner->run(),
    'seed'     => seedDatabase($runner),
    'wipe'     => $runner->wipe(),
    default    => print("Unknown command: $action\n")
};

/**
 * Run all migrations followed by all seeders.
 *
 * @param MigrationRunner $runner
 * @return void
 */
function seedDatabase(MigrationRunner $runner): void
{
    echo "Running migrations...\n";
    $runner->run();

    echo "Running DatabaseSeeder...\n";
    (new DatabaseSeeder)->run();

    echo "All seeders executed.\n";
}
