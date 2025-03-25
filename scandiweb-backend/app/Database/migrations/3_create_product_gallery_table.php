<?php
return new class {
    public function up() {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS product_gallery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(100),
            url TEXT NOT NULL,
            position INT DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )");
    }
};