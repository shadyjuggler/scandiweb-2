<?php
return new class {
    public function up() {
        $pdo = \App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS product_attributes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(100),
            attribute_id INT,
            attribute_item_id INT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (attribute_id) REFERENCES attributes(id),
            FOREIGN KEY (attribute_item_id) REFERENCES attribute_items(id)
        )");
    }
};