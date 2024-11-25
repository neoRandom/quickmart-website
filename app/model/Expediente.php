<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Expediente extends Model {
    public const TABLE_NAME = "expediente";

    private int $cod_expediente;
    private string $hora_inicio;
    private string $hora_fim;

    // ================================================== Constructor ==================================================

    public function __construct(
        int $cod_expediente = 0,
        string $hora_inicio = "",
        string $hora_fim = ""
    ) {
        $this->cod_expediente = $cod_expediente;
        $this->hora_inicio = $hora_inicio;
        $this->hora_fim = $hora_fim;
    }

    // ================================================== Conversion Methods ==================================================

    public function toArray(): array {
        return [
            "cod_expediente" => $this->cod_expediente,
            "hora_inicio" => $this->hora_inicio,
            "hora_fim" => $this->hora_fim,
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_expediente"])) {
                $this->setCodExpediente($data["cod_expediente"]);
            }
            if (isset($data["hora_inicio"])) {
                $this->setHoraInicio($data["hora_inicio"]);
            }
            if (isset($data["hora_fim"])) {
                $this->setHoraFim($data["hora_fim"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodExpediente(): int {
        return $this->cod_expediente;
    }

    public function setCodExpediente(int $cod_expediente): void {
        $this->cod_expediente = $cod_expediente;
    }

    public function getHoraInicio(): string {
        return $this->hora_inicio;
    }

    public function setHoraInicio(string $hora_inicio): void {
        $this->hora_inicio = $hora_inicio;
    }

    public function getHoraFim(): string {
        return $this->hora_fim;
    }

    public function setHoraFim(string $hora_fim): void {
        $this->hora_fim = $hora_fim;
    }

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    public function create(): bool {
        $sql = "INSERT INTO expediente (cod_expediente, hora_inicio, hora_fim)
                VALUES (:cod_expediente, :hora_inicio, :hora_fim)";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_expediente' => $this->getCodExpediente(),
                ':hora_inicio' => $this->getHoraInicio(),
                ':hora_fim' => $this->getHoraFim(),
            ]
        );
    }

    public function read(): bool {
        $sql = "SELECT * FROM expediente WHERE cod_expediente = :cod_expediente";
        $stmt = database\Connection::executeDQL(
            $sql,
            [":cod_expediente" => $this->getCodExpediente()]
        );

        $expediente = $stmt->fetch(database\Connection::FETCH_ASSOC);
        if ($expediente) {
            $this->fromArray($expediente);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE expediente SET
                    hora_inicio = :hora_inicio,
                    hora_fim = :hora_fim
                WHERE cod_expediente = :cod_expediente";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_expediente' => $this->getCodExpediente(),
                ':hora_inicio' => $this->getHoraInicio(),
                ':hora_fim' => $this->getHoraFim(),
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM expediente WHERE cod_expediente = :cod_expediente";
        return database\Connection::executeDML(
            $sql,
            [':cod_expediente' => $this->getCodExpediente()]
        );
    }

    // ========================= Table-scoped Methods =========================

    public static function getAll(string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM expediente";
        $params = [];

        if ($value !== "") {
            $sql .= " WHERE cod_expediente LIKE :value";
            $params[':value'] = "%$value%";
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

        $expedientes = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $expedientes[] = new Expediente(
                cod_expediente: $row['cod_expediente'],
                hora_inicio: $row['hora_inicio'],
                hora_fim: $row['hora_fim']
            );
        }

        return $expedientes;
    }
}

?>
