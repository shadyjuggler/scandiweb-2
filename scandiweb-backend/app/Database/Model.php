<?php

namespace App\Database;

use App\Database\DB;
use PDO;

/**
 * Class Model
 *
 * Base Model class providing simple ORM-like functionality
 * for interacting with database tables.
 */
abstract class Model
{
    /**
     * @var string Name of the table related to the model.
     */
    protected string $table;

    /**
     * @var array List of fillable fields that can be mass-assigned.
     */
    protected array $fillable = [];

    /**
     * Get all records from the table.
     *
     * @return array An array of all rows as associative arrays.
     */
    public function all(): array
    {
        $stmt = DB::raw()->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Find a record by its primary key.
     *
     * @param int $id The ID of the record.
     * @return array|null The record as an associative array, or null if not found.
     */
    public function find(int $id): ?array
    {
        $stmt = DB::raw()->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Insert a new record into the database.
     *
     * @param array $data Key-value pairs of column names and values.
     * @return int The ID of the newly inserted record.
     */
    public function create(array $data): int
    {
        $keys = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        $stmt = DB::raw()->prepare("INSERT INTO {$this->table} ($keys) VALUES ($placeholders)");
        $stmt->execute(array_values($data));
        return DB::raw()->lastInsertId();
    }

    /**
     * Update a record in the database by ID.
     *
     * @param int $id The ID of the record to update.
     * @param array $data Key-value pairs of columns to update.
     * @return bool True on success, false on failure.
     */
    public function update(int $id, array $data): bool
    {
        $fields = implode(', ', array_map(fn($key) => "$key = ?", array_keys($data)));
        $stmt = DB::raw()->prepare("UPDATE {$this->table} SET $fields WHERE id = ?");
        return $stmt->execute([...array_values($data), $id]);
    }

    /**
     * Delete a record from the database by ID.
     *
     * @param int $id The ID of the record to delete.
     * @return bool True on success, false on failure.
     */
    public function delete(int $id): bool
    {
        $stmt = DB::raw()->prepare("DELETE FROM {$this->table} WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
