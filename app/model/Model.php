<?php
require_once __DIR__ . "/../database/Connection.php";

abstract class Model {
    /* private ... */

    public function __construct(
        /* ... */
    ) {
        /* ... */
    }

    // ================================================== Getters and Setters ==================================================

    /* ... */

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    public abstract function create(): bool;

    public abstract function read(): bool;

    public abstract function update(): bool;

    public abstract function delete(): bool;

    // ========================= Table-scoped Methods =========================

    public abstract static function getAll(string $value = ""): array;
}

?>
