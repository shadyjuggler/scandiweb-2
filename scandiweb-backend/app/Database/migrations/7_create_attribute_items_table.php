<?php
return new class {
    public function up() {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS attribute_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            attribute_id INT,
            display_value VARCHAR(100),
            value VARCHAR(100),
            FOREIGN KEY (attribute_id) REFERENCES attributes(id)
        )");
    }
};