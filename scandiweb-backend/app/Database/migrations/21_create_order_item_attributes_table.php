<?php
return new class {
    public function up(): void {
        $pdo = App\Database\DB::pdo();
        $pdo->exec("CREATE TABLE IF NOT EXISTS order_item_attributes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_item_id INT,
            attribute_item_id INT,
            FOREIGN KEY (order_item_id) REFERENCES order_items(id),
            FOREIGN KEY (attribute_item_id) REFERENCES attribute_items(id)
        )");
    }
};