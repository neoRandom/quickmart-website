<?php
namespace model;

require_once __DIR__ . "/../database/Connection.php";

abstract class Model {
    public const TABLE_NAME = "";
    /* private ... */

    public function __construct(
        /* ... */
    ) {
        /* ... */
    }

    public abstract function toArray(): array;

    public abstract function fromArray(array $data): bool;

    // ================================================== Getters and Setters ==================================================

    /* ... */

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    abstract public function create(): bool;

    abstract public function read(): bool;

    abstract public function update(): bool;

    abstract public function delete(): bool;

    // ========================= Table-scoped Methods =========================

    abstract public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array;
}

?>
