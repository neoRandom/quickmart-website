<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class NivelAcesso extends Model {
    public const TABLE_NAME = "nivel_acesso";

    private int $cod_nivel;
    private string $descricao;

    public function __construct(int $cod_nivel = 0, string $descricao = "") {
        $this->cod_nivel = $cod_nivel;
        $this->descricao = $descricao;
    }

    public function toArray(): array {
        return [
            "cod_nivel" => $this->cod_nivel,
            "descricao" => $this->descricao
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_nivel"])) {
                $this->setCodNivel($data["cod_nivel"]);
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

    public function getCodNivel(): int {
        return $this->cod_nivel;
    }

    public function setCodNivel(int $cod_nivel): void {
        $this->cod_nivel = $cod_nivel;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO nivel_acesso (descricao) VALUES (:descricao)";

        $result = database\Connection::executeDML(
            $sql, 
            [':descricao' => $this->getDescricao()]
        );

        if ($result) {
            $this->setCodNivel(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM nivel_acesso WHERE cod_nivel = :cod_nivel";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_nivel" => $this->getCodNivel()]
        );

        $nivelAcesso = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($nivelAcesso) {
            $this->fromArray($nivelAcesso);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE nivel_acesso SET descricao = :descricao WHERE cod_nivel = :cod_nivel";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_nivel' => $this->getCodNivel(),
                ':descricao' => $this->getDescricao()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM nivel_acesso WHERE cod_nivel = :cod_nivel";

        return database\Connection::executeDML(
            $sql,
            [':cod_nivel' => $this->getCodNivel()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM nivel_acesso";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "cod_nivel";
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

        $niveisAcesso = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $niveisAcesso[] = new NivelAcesso(
                cod_nivel: $row['cod_nivel'],
                descricao: $row['descricao']
            );
        }

        return $niveisAcesso;
    }
}
?>
