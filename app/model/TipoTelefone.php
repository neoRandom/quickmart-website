<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class TipoTelefone extends Model {
    public const TABLE_NAME = "tipo_telefone";

    private int $id_tipo;
    private string $descricao;

    public function __construct(int $id_tipo = 0, string $descricao = "") {
        $this->id_tipo = $id_tipo;
        $this->descricao = $descricao;
    }

    public function toArray(): array {
        return [
            "id_tipo" => $this->id_tipo,
            "descricao" => $this->descricao
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["id_tipo"])) {
                $this->setIdTipo($data["id_tipo"]);
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

    public function getIdTipo(): int {
        return $this->id_tipo;
    }

    public function setIdTipo(int $id_tipo): void {
        $this->id_tipo = $id_tipo;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO tipo_telefone (descricao)
                VALUES (:descricao)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':descricao' => $this->getDescricao()
            ]
        );

        if ($result) {
            $this->setIdTipo(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM tipo_telefone WHERE id_tipo = :id_tipo";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":id_tipo" => $this->getIdTipo()]
        );

        $tipoTelefone = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($tipoTelefone) {
            $this->fromArray($tipoTelefone);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE tipo_telefone SET descricao = :descricao 
                WHERE id_tipo = :id_tipo";

        return database\Connection::executeDML(
            $sql,
            [
                ':id_tipo' => $this->getIdTipo(),
                ':descricao' => $this->getDescricao()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM tipo_telefone WHERE id_tipo = :id_tipo";

        return database\Connection::executeDML(
            $sql,
            [':id_tipo' => $this->getIdTipo()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM tipo_telefone";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "descricao";
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

        $tiposTelefone = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $tiposTelefone[] = new TipoTelefone(
                id_tipo: $row['id_tipo'],
                descricao: $row['descricao']
            );
        }

        return $tiposTelefone;
    }
}
?>
