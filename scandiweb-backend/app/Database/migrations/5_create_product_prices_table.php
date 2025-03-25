<?php
return new class {
    public function up() {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS product_prices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(100),
            currency VARCHAR(10),
            amount DECIMAL(10, 2),
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (currency) REFERENCES currencies(label)
        )");
    }
};