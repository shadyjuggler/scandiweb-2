<?php
return new class {
    public function up() {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS currencies (
            label VARCHAR(10) PRIMARY KEY,
            symbol VARCHAR(10)
        )");
    }
};