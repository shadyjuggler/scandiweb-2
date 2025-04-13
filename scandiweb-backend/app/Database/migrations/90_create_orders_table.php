<?php
return new class {
    public function up() {
        $pdo = App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            currency VARCHAR(10),
            total_amount DECIMAL(10, 2),
            FOREIGN KEY (currency) REFERENCES currencies(label)
        )");
    }
};