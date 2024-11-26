<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class MetodoPagamento extends Model {
    public const TABLE_NAME = "metodo_pagamento";

    private int $cod_pagamento;
    private string $descricao;

    public function __construct(int $cod_pagamento = 0, string $descricao = "") {
        $this->cod_pagamento = $cod_pagamento;
        $this->descricao = $descricao;
    }

    public function toArray(): array {
        return [
            "cod_pagamento" => $this->cod_pagamento,
            "descricao" => $this->descricao
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_pagamento"])) {
                $this->setCodPagamento($data["cod_pagamento"]);
            }
            if (isset($data["descricao"])) {
                $this->setDescricao($data["descricao"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodPagamento(): int {
        return $this->cod_pagamento;
    }

    public function setCodPagamento(int $cod_pagamento): void {
        $this->cod_pagamento = $cod_pagamento;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO metodo_pagamento (descricao) VALUES (:descricao)";

        $result = database\Connection::executeDML(
            $sql, 
            [':descricao' => $this->getDescricao()]
        );

        if ($result) {
            $this->setCodPagamento(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM metodo_pagamento WHERE cod_pagamento = :cod_pagamento";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_pagamento" => $this->getCodPagamento()]
        );

        $metodoPagamento = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($metodoPagamento) {
            $this->fromArray($metodoPagamento);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE metodo_pagamento SET descricao = :descricao WHERE cod_pagamento = :cod_pagamento";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_pagamento' => $this->getCodPagamento(),
                ':descricao' => $this->getDescricao()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM metodo_pagamento WHERE cod_pagamento = :cod_pagamento";

        return database\Connection::executeDML(
            $sql,
            [':cod_pagamento' => $this->getCodPagamento()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM metodo_pagamento";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "cod_pagamento";
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

        $metodosPagamento = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $metodosPagamento[] = new MetodoPagamento(
                cod_pagamento: $row['cod_pagamento'],
                descricao: $row['descricao']
            );
        }

        return $metodosPagamento;
    }
}
?>
