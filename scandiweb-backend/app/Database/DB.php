<?php

namespace App\Database;

use PDO;
use PDOException;

/**
 * Class DB
 *
 * Database connection class. Implements a singleton-style 
 * connection to avoid multiple connections.
 */
class DB
{
    /**
     * The PDO instance used for the database connection.
     *
     * @var PDO|null
     */
    private static ?PDO $pdo = null;

    /**
     * Establishes and returns a PDO connection.
     * If a connection already exists, it reuses it.
     *
     * @return PDO
     * @throws PDOException
     */
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

    /**
     * For debug, let's leave it here ;)
     *
     * @return string A static greeting message.
     */
    public static function greet(): string
    {
        return DB::class . " says hello!";
    }

    /**
     * Alias for ::conect().
     *
     * @return PDO The PDO instance db interaction.
     */
    public static function raw(): PDO
    {
        return self::connect();
    }
}
