<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Categoria extends Model {
    public const TABLE_NAME = "categoria";
    private int $cod_cate;
    private int $cod_promo_cate;
    private string $descricao;

    public function __construct(
        int $cod_cate = 0,
        int $cod_promo_cate = 0,
        string $descricao = ""
    ) {
        $this->cod_cate = $cod_cate;
        $this->cod_promo_cate = $cod_promo_cate;
        $this->descricao = $descricao;
    }

    public function toArray(): array {
        return [
            "cod_cate" => $this->cod_cate,
            "cod_promo_cate" => $this->cod_promo_cate,
            "descricao" => $this->descricao
        ];
    }

    /**
     * Sets the properties of the current Categoria instance from an array.
     * The array must contain the following keys:
     * - cod_cate
     * - cod_promo_cate
     * - descricao
     *
     * @param array $data An array containing the data to set
     *
     * @return bool true if the data is successfully set, false if an exception is thrown
     */
    public function fromArray(array $data): bool {
        try {
            $this->setCodCate($data["cod_cate"] ?? 0);
            $this->setCodPromoCate($data["cod_promo_cate"]);
            $this->setDescricao($data["descricao"]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodCate(): int {
        return $this->cod_cate;
    }

    public function setCodCate(int $cod_cate): void {
        $this->cod_cate = $cod_cate;
    }

    public function getCodPromoCate(): int {
        return $this->cod_promo_cate;
    }

    public function setCodPromoCate(int $cod_promo_cate): void {
        $this->cod_promo_cate = $cod_promo_cate;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    public function create(): bool {
        $sql = "INSERT INTO categoria (cod_promo_cate, descricao)
                VALUES (:cod_promo_cate, :descricao)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':cod_promo_cate' => $this->getCodPromoCate(),
                ':descricao' => $this->getDescricao()
            ]
        );

        if ($result == true) {
            $this->setCodCate(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    /**
     * Read the category from the database by cod_cate.
     *
     * @return bool Returns true if a category is found and data is populated, false otherwise.
     */
    public function read(): bool {
        // Prepare the SQL query to select category by cod_cate
        $sql = "SELECT * FROM categoria WHERE cod_cate = :cod_cate";

        // Execute the query and get the statement object
        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_cate" => $this->getCodCate()]
        );

        // Fetch the category data as an associative array
        $categoria = $stmt->fetch(database\Connection::FETCH_ASSOC);

        // Check if a category was found
        if ($categoria) {
            // Set the object's properties with the fetched data
            $this->setCodCate($categoria['cod_cate']);
            $this->setCodPromoCate($categoria['cod_promo_cate']);
            $this->setDescricao($categoria['descricao']);

            return true;
        }

        return false;
    }

    /**
     * Updates the existing Categoria in the database.
     * 
     * @return bool True if the update was successful, false otherwise
     */
    public function update(): bool {
        // Prepare the SQL query to update category
        $sql = "UPDATE categoria SET
                    cod_promo_cate = :cod_promo_cate,
                    descricao = :descricao
                WHERE cod_cate = :cod_cate";

        // Execute the update query
        return database\Connection::executeDML(
            $sql,
            [
                ':cod_cate' => $this->getCodCate(),
                ':cod_promo_cate' => $this->getCodPromoCate(),
                ':descricao' => $this->getDescricao()
            ]
        );
    }

    /**
     * Deletes the current Categoria from the database.
     * 
     * @return bool True if the deletion was successful, false otherwise
     */
    public function delete(): bool {
        // Prepare the SQL query to delete the category
        $sql = "DELETE FROM categoria WHERE cod_cate = :cod_cate";

        // Execute the deletion query
        return database\Connection::executeDML(
            $sql,
            [':cod_cate' => $this->getCodCate()]
        );
    }

    // ========================= Table-scoped Methods =========================

    public static function getAll(string $value = ""): array {
        if ($value !== "") {
            $sql = "SELECT * FROM categoria WHERE descricao LIKE :descricao";
            $stmt = database\Connection::executeDQL(
                $sql,
                [':descricao' => "%$value%"]
            );
        }
        else {
            $sql = "SELECT * FROM categoria";
            $stmt = database\Connection::executeDQL(
                $sql
            );
        }

        if ($stmt === null) {
            throw new \PDOException("Erro ao executar a consulta SQL");
        }

        $categorias = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            if ($row === false) {
                throw new \PDOException("Erro ao ler o registro da consulta SQL");
            }

            $categorias[] = new Categoria(
                cod_cate: $row['cod_cate'],
                cod_promo_cate: $row['cod_promo_cate'],
                descricao: $row['descricao']
            );
        }

        return $categorias;
    }
}
