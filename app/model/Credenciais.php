<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Credenciais extends Model {
    public const TABLE_NAME = "credenciais";

    private string $usuario;
    private string $hash;
    private int $salt;
    private int $cod_acesso;

    // ================================================== Constructor ==================================================

    public function __construct(
        string $usuario = "",
        string $hash = "",
        int $salt = 0,
        int $cod_acesso = 0
    ) {
        $this->usuario = $usuario;
        $this->hash = $hash;
        $this->salt = $salt;
        $this->cod_acesso = $cod_acesso;
    }

    // ================================================== Conversion Methods ==================================================

    public function toArray(): array {
        return [
            "usuario" => $this->usuario,
            "hash" => $this->hash,
            "salt" => $this->salt,
            "cod_acesso" => $this->cod_acesso,
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["usuario"])) {
                $this->setUsuario($data["usuario"]);
            }
            if (isset($data["hash"])) {
                $this->setHash($data["hash"]);
            }
            if (isset($data["salt"])) {
                $this->setSalt($data["salt"]);
            }
            if (isset($data["cod_acesso"])) {
                $this->setCodAcesso($data["cod_acesso"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getUsuario(): string {
        return $this->usuario;
    }

    public function setUsuario(string $usuario): void {
        $this->usuario = $usuario;
    }

    public function getHash(): string {
        return $this->hash;
    }

    public function setHash(string $hash): void {
        $this->hash = $hash;
    }

    public function getSalt(): int {
        return $this->salt;
    }

    public function setSalt(int $salt): void {
        $this->salt = $salt;
    }

    public function getCodAcesso(): int {
        return $this->cod_acesso;
    }

    public function setCodAcesso(int $cod_acesso): void {
        $this->cod_acesso = $cod_acesso;
    }

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    public function create(): bool {
        $sql = "INSERT INTO credenciais (usuario, hash, salt, cod_acesso)
                VALUES (:usuario, :hash, :salt, :cod_acesso)";

        return database\Connection::executeDML(
            $sql,
            [
                ':usuario' => $this->getUsuario(),
                ':hash' => $this->getHash(),
                ':salt' => $this->getSalt(),
                ':cod_acesso' => $this->getCodAcesso(),
            ]
        );
    }

    public function read(): bool {
        $sql = "SELECT * FROM credenciais WHERE usuario = :usuario";
        $stmt = database\Connection::executeDQL(
            $sql,
            [":usuario" => $this->getUsuario()]
        );

        $credenciais = $stmt->fetch(database\Connection::FETCH_ASSOC);
        if ($credenciais) {
            $this->fromArray($credenciais);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE credenciais SET
                    hash = :hash,
                    salt = :salt,
                    cod_acesso = :cod_acesso
                WHERE usuario = :usuario";

        return database\Connection::executeDML(
            $sql,
            [
                ':usuario' => $this->getUsuario(),
                ':hash' => $this->getHash(),
                ':salt' => $this->getSalt(),
                ':cod_acesso' => $this->getCodAcesso(),
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM credenciais WHERE usuario = :usuario";
        return database\Connection::executeDML(
            $sql,
            [':usuario' => $this->getUsuario()]
        );
    }

    // ========================= Table-scoped Methods =========================

    public static function getAll(string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM credenciais";
        $params = [];

        if ($value !== "") {
            $sql .= " WHERE usuario LIKE :value";
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

        $credenciais = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $credenciais[] = new Credenciais(
                usuario: $row['usuario'],
                hash: $row['hash'],
                salt: $row['salt'],
                cod_acesso: $row['cod_acesso']
            );
        }

        return $credenciais;
    }
}

?>
