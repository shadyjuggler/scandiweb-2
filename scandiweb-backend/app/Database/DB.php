<?php

namespace App\Database;

use PDO;
use PDOException;

class DB
{
    private static ?PDO $pdo = null;

    public static function connect(): PDO
    {
        if (!self::$pdo) {
            try {
                self::$pdo = new PDO(
                    $_ENV['DB_CONNECTION'] . ":host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_DATABASE'],
                    $_ENV['DB_USERNAME'],
                    $_ENV['DB_PASSWORD']
                );
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("DB Connection failed: " . $e->getMessage());
            }
        }
        return self::$pdo;
    }

    public static function greet(): string
    {
        return DB::class . " says hello!";
    }

    public static function raw(): PDO
    {
        return self::connect();
    }
}
