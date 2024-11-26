<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Lote extends Model {
    public const TABLE_NAME = "lote";

    private int $cod_lote;
    private int $cod_prod;
    private string $data_validade;
    private string $data_compra;
    private int $quantidade;

    public function __construct(
        int $cod_lote = 0,
        int $cod_prod = 0,
        string $data_validade = "",
        string $data_compra = "",
        int $quantidade = 0
    ) {
        $this->cod_lote = $cod_lote;
        $this->cod_prod = $cod_prod;
        $this->data_validade = $data_validade;
        $this->data_compra = $data_compra;
        $this->quantidade = $quantidade;
    }

    public function toArray(): array {
        return [
            "cod_lote" => $this->cod_lote,
            "cod_prod" => $this->cod_prod,
            "data_validade" => $this->data_validade,
            "data_compra" => $this->data_compra,
            "quantidade" => $this->quantidade
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_lote"])) {
                $this->setCodLote($data["cod_lote"]);
            }
            if (isset($data["cod_prod"])) {
                $this->setCodProd($data["cod_prod"]);
            }
            if (isset($data["data_validade"])) {
                $this->setDataValidade($data["data_validade"]);
            }
            if (isset($data["data_compra"])) {
                $this->setDataCompra($data["data_compra"]);
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

    public function getCodLote(): int {
        return $this->cod_lote;
    }

    public function setCodLote(int $cod_lote): void {
        $this->cod_lote = $cod_lote;
    }

    public function getCodProd(): int {
        return $this->cod_prod;
    }

    public function setCodProd(int $cod_prod): void {
        $this->cod_prod = $cod_prod;
    }

    public function getDataValidade(): string {
        return $this->data_validade;
    }

    public function setDataValidade(string $data_validade): void {
        $this->data_validade = $data_validade;
    }

    public function getDataCompra(): string {
        return $this->data_compra;
    }

    public function setDataCompra(string $data_compra): void {
        $this->data_compra = $data_compra;
    }

    public function getQuantidade(): int {
        return $this->quantidade;
    }

    public function setQuantidade(int $quantidade): void {
        $this->quantidade = $quantidade;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO lote (cod_prod, data_validade, data_compra, quantidade) 
                VALUES (:cod_prod, :data_validade, :data_compra, :quantidade)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':cod_prod' => $this->getCodProd(),
                ':data_validade' => $this->getDataValidade(),
                ':data_compra' => $this->getDataCompra(),
                ':quantidade' => $this->getQuantidade()
            ]
        );

        if ($result) {
            $this->setCodLote(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM lote WHERE cod_lote = :cod_lote";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_lote" => $this->getCodLote()]
        );

        $lote = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($lote) {
            $this->fromArray($lote);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE lote SET 
                    cod_prod = :cod_prod, 
                    data_validade = :data_validade, 
                    data_compra = :data_compra, 
                    quantidade = :quantidade 
                WHERE cod_lote = :cod_lote";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_lote' => $this->getCodLote(),
                ':cod_prod' => $this->getCodProd(),
                ':data_validade' => $this->getDataValidade(),
                ':data_compra' => $this->getDataCompra(),
                ':quantidade' => $this->getQuantidade()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM lote WHERE cod_lote = :cod_lote";

        return database\Connection::executeDML(
            $sql,
            [':cod_lote' => $this->getCodLote()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM lote";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "cod_lote";
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

        $lotes = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $lotes[] = new Lote(
                cod_lote: $row['cod_lote'],
                cod_prod: $row['cod_prod'],
                data_validade: $row['data_validade'],
                data_compra: $row['data_compra'],
                quantidade: $row['quantidade']
            );
        }

        return $lotes;
    }
}
?>
