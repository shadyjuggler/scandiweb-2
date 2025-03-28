<?php

namespace App\Database;

use App\Database\DB;
use Error;
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
     * @var string[] List of columns to select.
     */
    protected array $selectColumns = ['*'];

    /**
     * @var string apply SELECT DISTINCT statement or not.
     */
    protected string $distinct = "";

    /**
     * @var array List of fillable fields that can be mass-assigned.
     */
    protected array $fillable = [];

    /**
     * @var array Array of "where" clause conditions.
     */
    protected array $whereConditions = [];

    /**
     * @var array Array of "join" clause relations.
     */
    protected array $joins = [];


    /**
     * Get all records from the table.
     *
     * @return array An array of all rows as associative arrays.
     */
    public function all(): array
    {
        $stmt = DB::pdo()->query("SELECT * FROM {$this->table}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Find a record by its primary key.
     *
     * @param int|string $id The ID of the record.
     * @return array|null The record as an associative array, or null if not found.
     */
    public function find(int|string $id): ?array
    {
        $stmt = DB::pdo()->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    /**
     * Insert a new record into the database.
     *
     * @param array $data assoc array of column names and values.
     * @return int The ID of the newly inserted record.
     */
    public function create(array $data): int
    {
        $keys = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        $stmt = DB::pdo()->prepare("INSERT INTO {$this->table} ($keys) VALUES ($placeholders)");
        $stmt->execute(array_values($data));
        return DB::pdo()->lastInsertId();
    }

    /**
     * First record matched the conditions or create new one.
     *
     * If a record with the given conditions exists, it returns that record.
     * Otherwise, it inserts a new record using the provided data (or the conditions).
     *
     * @param array $conditions Key-value pairs to check existence
     * @param array|null $data Data to insert (optional, defaults to $conditions)
     * @return array|int|null The existing or newly created record id
     */
    public function firstOrCreate(array $conditions, ?array $data = null): array | int | null
    {
        $where = [];
        $values = [];

        foreach ($conditions as $key => $val) {
            $where[] = "{$key} = ?";
            $values[] = $val;
        }

        $query = "SELECT * FROM {$this->table} WHERE " . implode(" AND ", $where) . " LIMIT 1";
        $stmt = DB::pdo()->prepare($query);
        $stmt->execute($values);

        $existing = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($existing) {
            return $existing;
        }

        return $this->create($data ?? $conditions);
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
        $stmt = DB::pdo()->prepare("UPDATE {$this->table} SET $fields WHERE id = ?");
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
        $stmt = DB::pdo()->prepare("DELETE FROM {$this->table} WHERE id = ?");
        return $stmt->execute([$id]);
    }

    /**
     * Set the columns to select in the query.
     *
     * @param array|string $columns
     * @return $this
     */
    public function distinct(): static
    {
        $this->distinct = "DISTINCT";
        return $this;
    }

    /**
     * Set the columns to select in the query.
     *
     * @param array|string $columns
     * @return $this
     */
    public function select(array|string $columns, $distinct = false): static
    {
        $this->selectColumns = is_array($columns) ? $columns : [$columns];
        return $this;
    }

    /**
     * Add a WHERE condition.
     *
     * @param string $column
     * @param string $operator
     * @param mixed $value
     * @return $this
     */
    public function where(string $column, string $operator, mixed $value): static
    {
        $this->whereConditions[] = [
            "col" => $column,
            "op" => $operator,
            "val" => $value
        ];
        return $this;
    }

    /**
     * Add a JOIN clause.
     *
     * @param string $table The table to join
     * @param string $localKey The column from this model's table
     * @param string $foreignKey The column from the joined table
     * @param string $type Join type (default: INNER)
     * @return $this
     */
    public function join(string $table, string $localKey, string $foreignKey, string $type = 'INNER'): static
    {
        $this->joins[] = [
            'table' => $table,
            'local' => "{$this->table}.{$localKey}",
            'foreign' => "{$table}.{$foreignKey}",
            'type' => $type,
        ];
        return $this;
    }

    /**
     * Execute the built query and return all matching records.
     *
     * @return array
     */
    public function get(): array
    {
        $select = implode(', ', $this->selectColumns);
        $query = "SELECT {$this->distinct} {$select} FROM {$this->table}";
        $params = [];

        if (!empty($this->joins)) {
            foreach ($this->joins as $join) {
                $query .= " {$join['type']} JOIN {$join['table']} ON {$join['local']} = {$join['foreign']}";
            }
        }

        if (!empty($this->whereConditions)) {
            $wheres = [];
            foreach ($this->whereConditions as $conditon) {
                $wheres[] = "{$conditon['col']} {$conditon['op']} ?";
                $params[] = $conditon['val'];
            }
            $query .= " WHERE " . implode(" AND ", $wheres);
        }

        $stmt = DB::pdo()->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get the first matching record or null.
     *
     * @return array|null
     */
    public function first(): ?array
    {
        $results = $this->get();
        return $results[0] ?? null;
    }

    /**
     * Get the first record matching a single condition.
     *
     * @param string $column
     * @param mixed $value
     * @param string $operator
     * @return array|null
     */
    public function firstWhere(string $column, mixed $value, string $operator = '='): ?array
    {
        return $this->where($column, $operator, $value)->first();
    }
}
