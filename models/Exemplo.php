<?php

class Exemplo {
    /* private ... */
    private Connection $db;

    public function __construct(
        /* ... */
    ) {
        $this->db = Connection::getInstance();
        /* ... */
    }

    // ================================================== Getters and Setters ==================================================

    /* ... */

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    public function create(): bool { /* ... */ }

    public function read(): bool { /* ... */ }

    public function update(): bool { /* ... */ }

    public function delete(): bool { /* ... */ }

    // ========================= Table-scoped Methods =========================

    public static function getAll(): array { /* ... */ }
}

?>
