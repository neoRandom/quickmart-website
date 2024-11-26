<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Classificacao extends Model {
    public const TABLE_NAME = "classificacao";
    private int $cod_classific;
    private string $descricao;

    public function __construct(
        int $cod_classific = 0,
        string $descricao = ""
    ) {
        $this->cod_classific = $cod_classific;
        $this->descricao = $descricao;
    }

    public function toArray(): array {
        return [
            "cod_classific" => $this->cod_classific,
            "descricao" => $this->descricao
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_classific"])) {
                $this->setCodClassific($data["cod_classific"]);
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

    public function getCodClassific(): int {
        return $this->cod_classific;
    }

    public function setCodClassific(int $cod_classific): void {
        $this->cod_classific = $cod_classific;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO classificacao (descricao) 
                VALUES (:descricao)";

        $result = database\Connection::executeDML(
            $sql, 
            [':descricao' => $this->getDescricao()]
        );

        if ($result) {
            $this->setCodClassific(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM classificacao WHERE cod_classific = :cod_classific";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_classific" => $this->getCodClassific()]
        );

        $classific = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($classific) {
            $this->setCodClassific($classific['cod_classific']);
            $this->setDescricao($classific['descricao']);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE classificacao SET 
                    descricao = :descricao 
                WHERE cod_classific = :cod_classific";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_classific' => $this->getCodClassific(),
                ':descricao' => $this->getDescricao()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM classificacao WHERE cod_classific = :cod_classific";

        return database\Connection::executeDML(
            $sql,
            [':cod_classific' => $this->getCodClassific()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM classificacao";
        $params = [];
        
        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        }
        else {
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

        $classificacoes = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $classificacoes[] = new Classificacao(
                cod_classific: $row['cod_classific'],
                descricao: $row['descricao']
            );
        }

        return $classificacoes;
    }
}
?>
