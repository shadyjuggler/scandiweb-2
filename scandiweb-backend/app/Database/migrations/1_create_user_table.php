
<?php

use App\Database\DB;

return new class {
    public function up()
    {
        $pdo = DB::pdo();
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS test (
                id INT AUTO_INCREMENT PRIMARY KEY,
                word1 VARCHAR(100),
                word2 VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
};
