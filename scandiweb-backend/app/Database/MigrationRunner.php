<?php

namespace App\Database;

/**
 * Class MigrationRunner
 *
 * Handles db migrations and logs executed migrations.
 */
class MigrationRunner
{
    /**
     * @var string Path where migrations located.
     */
    protected string $migrationDir = __DIR__ . '/migrations';

    /**
     * @var string Path to file where migrations logs located.
     */
    protected string $logFile = __DIR__ . '/../logs/migration_log.json';

    /**
     * Runs all unexectuted migrations.
     *
     * @return void
     */
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

            echo "[Migration]: $name\n";
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

    /**
     * Wipe database.
     * 
     * Removes all tables and records from db.
     *
     * @return void
     */
    public function wipe(): void {
        $pdo = DB::pdo();
    
        echo "Wiping database...\n";
    
        $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll($pdo::FETCH_COLUMN);
    
        foreach ($tables as $table) {
            echo "[DROP table]: $table\n";
            $pdo->exec("DROP TABLE IF EXISTS `$table`");
        }
    
        $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    
        // Delete migration log file
        if (file_exists($this->logFile)) {
            unlink($this->logFile);
            echo "Deleted migration log file.\n";
        }
    
        echo "Database wiped successfully.\n";
    }
    
}
