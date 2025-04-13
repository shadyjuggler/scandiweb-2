<?php

return new class {
    public function up()
    {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            in_stock BOOLEAN DEFAULT TRUE,
            brand VARCHAR(100),
            category_id INT,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )");
    }
};
