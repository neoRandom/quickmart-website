<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Itens extends Model {
    public const TABLE_NAME = "itens";

    private int $cod_item;
    private int $cod_lote;
    private int $cod_compra;
    private int $quantidade;

    public function __construct(
        int $cod_item = 0,
        int $cod_lote = 0,
        int $cod_compra = 0,
        int $quantidade = 0
    ) {
        $this->cod_item = $cod_item;
        $this->cod_lote = $cod_lote;
        $this->cod_compra = $cod_compra;
        $this->quantidade = $quantidade;
    }

    public function toArray(): array {
        return [
            "cod_item" => $this->cod_item,
            "cod_lote" => $this->cod_lote,
            "cod_compra" => $this->cod_compra,
            "quantidade" => $this->quantidade
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_item"])) {
                $this->setCodItem($data["cod_item"]);
            }
            if (isset($data["cod_lote"])) {
                $this->setCodLote($data["cod_lote"]);
            }
            if (isset($data["cod_compra"])) {
                $this->setCodCompra($data["cod_compra"]);
            }
            if (isset($data["quantidade"])) {
                $this->setQuantidade($data["quantidade"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodItem(): int {
        return $this->cod_item;
    }

    public function setCodItem(int $cod_item): void {
        $this->cod_item = $cod_item;
    }

    public function getCodLote(): int {
        return $this->cod_lote;
    }

    public function setCodLote(int $cod_lote): void {
        $this->cod_lote = $cod_lote;
    }

    public function getCodCompra(): int {
        return $this->cod_compra;
    }

    public function setCodCompra(int $cod_compra): void {
        $this->cod_compra = $cod_compra;
    }

    public function getQuantidade(): int {
        return $this->quantidade;
    }

    public function setQuantidade(int $quantidade): void {
        $this->quantidade = $quantidade;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO itens (cod_lote, cod_compra, quantidade) 
                VALUES (:cod_lote, :cod_compra, :quantidade)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':cod_lote' => $this->getCodLote(),
                ':cod_compra' => $this->getCodCompra(),
                ':quantidade' => $this->getQuantidade()
            ]
        );

        if ($result) {
            $this->setCodItem(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM itens WHERE cod_item = :cod_item";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_item" => $this->getCodItem()]
        );

        $item = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($item) {
            $this->fromArray($item);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE itens SET 
                    cod_lote = :cod_lote, 
                    cod_compra = :cod_compra, 
                    quantidade = :quantidade 
                WHERE cod_item = :cod_item";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_item' => $this->getCodItem(),
                ':cod_lote' => $this->getCodLote(),
                ':cod_compra' => $this->getCodCompra(),
                ':quantidade' => $this->getQuantidade()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM itens WHERE cod_item = :cod_item";

        return database\Connection::executeDML(
            $sql,
            [':cod_item' => $this->getCodItem()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM itens";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "cod_item";
        }

        if ($value !== "" && isset($sanitizedKey)) {
            $sql .= " WHERE $sanitizedKey LIKE :value";
            $params[':value'] = '%' . $value . '%';
        }

        if ($limit > 0) {
            $sql .= " LIMIT " . intval($limit);
        }
        if ($offset > 0) {
            $sql .= " OFFSET " . intval($offset);
        }

        $stmt = database\Connection::executeDQL($sql, $params);

        if ($stmt === null) {
            throw new \PDOException("Erro ao executar a consulta SQL");
        }

        $itens = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $itens[] = new Itens(
                cod_item: $row['cod_item'],
                cod_lote: $row['cod_lote'],
                cod_compra: $row['cod_compra'],
                quantidade: $row['quantidade']
            );
        }

        return $itens;
    }
}
?>
