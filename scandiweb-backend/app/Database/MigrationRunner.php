<?php

namespace App\Database;

class MigrationRunner
{
    protected string $migrationDir = __DIR__ . '/migrations';
    protected string $logFile = __DIR__ . '/migration_log.json';

    public function run(): void
    {
        $migrated = file_exists($this->logFile)
            ? json_decode(file_get_contents($this->logFile), true)
            : [];

        $files = glob($this->migrationDir . '/*.php');
        $ranSomething = false;

        foreach ($files as $file) {
            $name = basename($file);
            if (in_array($name, $migrated)) {
                continue;
            }

            echo "Running migration: $name\n";
            $migration = require $file;
            $migration->up();
            $migrated[] = $name;
            $ranSomething = true;
        }

        if ($ranSomething) {
            file_put_contents($this->logFile, json_encode($migrated, JSON_PRETTY_PRINT));
            echo "All migrations complete.\n";
        } else {
            echo "No new migrations to run.\n";
        }
    }
}
