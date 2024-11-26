<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Telefone extends Model {
    public const TABLE_NAME = "telefone";

    private int $id_tel;
    private int $id_dono;
    private int $tipo_tel;
    private string $tipo_dono;
    private string $telefone;

    public function __construct(
        int $id_tel = 0,
        int $id_dono = 0,
        int $tipo_tel = 0,
        string $tipo_dono = "",
        string $telefone = ""
    ) {
        $this->id_tel = $id_tel;
        $this->id_dono = $id_dono;
        $this->tipo_tel = $tipo_tel;
        $this->tipo_dono = $tipo_dono;
        $this->telefone = $telefone;
    }

    public function toArray(): array {
        return [
            "id_tel" => $this->id_tel,
            "id_dono" => $this->id_dono,
            "tipo_tel" => $this->tipo_tel,
            "tipo_dono" => $this->tipo_dono,
            "telefone" => $this->telefone
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["id_tel"])) {
                $this->setIdTel($data["id_tel"]);
            }
            if (isset($data["id_dono"])) {
                $this->setIdDono($data["id_dono"]);
            }
            if (isset($data["tipo_tel"])) {
                $this->setTipoTel($data["tipo_tel"]);
            }
            if (isset($data["tipo_dono"])) {
                $this->setTipoDono($data["tipo_dono"]);
            }
            if (isset($data["telefone"])) {
                $this->setTelefone($data["telefone"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getIdTel(): int {
        return $this->id_tel;
    }

    public function setIdTel(int $id_tel): void {
        $this->id_tel = $id_tel;
    }

    public function getIdDono(): int {
        return $this->id_dono;
    }

    public function setIdDono(int $id_dono): void {
        $this->id_dono = $id_dono;
    }

    public function getTipoTel(): int {
        return $this->tipo_tel;
    }

    public function setTipoTel(int $tipo_tel): void {
        $this->tipo_tel = $tipo_tel;
    }

    public function getTipoDono(): string {
        return $this->tipo_dono;
    }

    public function setTipoDono(string $tipo_dono): void {
        $this->tipo_dono = $tipo_dono;
    }

    public function getTelefone(): string {
        return $this->telefone;
    }

    public function setTelefone(string $telefone): void {
        $this->telefone = $telefone;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO telefone (id_dono, tipo_tel, tipo_dono, telefone)
                VALUES (:id_dono, :tipo_tel, :tipo_dono, :telefone)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':id_dono' => $this->getIdDono(),
                ':tipo_tel' => $this->getTipoTel(),
                ':tipo_dono' => $this->getTipoDono(),
                ':telefone' => $this->getTelefone()
            ]
        );

        if ($result) {
            $this->setIdTel(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM telefone WHERE id_tel = :id_tel";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":id_tel" => $this->getIdTel()]
        );

        $telefone = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($telefone) {
            $this->fromArray($telefone);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE telefone SET 
                    id_dono = :id_dono, 
                    tipo_tel = :tipo_tel, 
                    tipo_dono = :tipo_dono, 
                    telefone = :telefone 
                WHERE id_tel = :id_tel";

        return database\Connection::executeDML(
            $sql,
            [
                ':id_tel' => $this->getIdTel(),
                ':id_dono' => $this->getIdDono(),
                ':tipo_tel' => $this->getTipoTel(),
                ':tipo_dono' => $this->getTipoDono(),
                ':telefone' => $this->getTelefone()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM telefone WHERE id_tel = :id_tel";

        return database\Connection::executeDML(
            $sql,
            [':id_tel' => $this->getIdTel()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM telefone";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "tipo_dono";
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

        $telefones = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $telefones[] = new Telefone(
                id_tel: $row['id_tel'],
                id_dono: $row['id_dono'],
                tipo_tel: (int)$row['tipo_tel'],
                tipo_dono: $row['tipo_dono'],
                telefone: $row['telefone']
            );
        }

        return $telefones;
    }
}
?>
