<?php
namespace model;

use database;
use utilities\Hash;

require_once __DIR__ . "/../autoload.php";

class Credenciais extends Model {
    public const TABLE_NAME = "credenciais";

    private int $cod_credencial;
    private string $usuario;
    private string $hash;
    private int $salt;
    private int $cod_acesso;

    public function __construct(
        int $cod_credencial = 0,
        string $usuario = "",
        string $hash = "",
        int $salt = 0,
        int $cod_acesso = 0
    ) {
        $this->cod_credencial = $cod_credencial;
        $this->usuario = $usuario;
        $this->hash = $hash;
        $this->salt = $salt;
        $this->cod_acesso = $cod_acesso;
    }

    public function toArray(): array {
        return [
            "cod_credencial" => $this->cod_credencial,
            "usuario" => $this->usuario,
            "hash" => $this->hash,
            "salt" => $this->salt,
            "cod_acesso" => $this->cod_acesso
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_credencial"])) {
                $this->setCodCredencial($data["cod_credencial"]);
            }
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

    public function generateHashSalt(string $password) {
        $salt = Hash::generateSalt();
        $hash = Hash::generate($password, $salt);

        $this->setSalt($salt);
        $this->setHash($hash);

        return true;
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodCredencial(): int {
        return $this->cod_credencial;
    }

    public function setCodCredencial(int $cod_credencial): void {
        $this->cod_credencial = $cod_credencial;
    }

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

    public function create(): bool {
        $sql = "INSERT INTO credenciais (usuario, hash, salt, cod_acesso) 
                VALUES (:usuario, :hash, :salt, :cod_acesso)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':usuario' => $this->getUsuario(),
                ':hash' => $this->getHash(),
                ':salt' => $this->getSalt(),
                ':cod_acesso' => $this->getCodAcesso()
            ]
        );

        if ($result) {
            $this->setCodCredencial(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM credenciais WHERE cod_credencial = :cod_credencial";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_credencial" => $this->getCodCredencial()]
        );

        $credencial = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($credencial) {
            $this->fromArray($credencial);
            return true;
        }

        return false;
    }

    public function readByUsername(): bool {
        $sql = "SELECT * FROM credenciais WHERE usuario COLLATE utf8mb4_bin LIKE :usuario";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":usuario" => $this->getUsuario()]
        );

        $credencial = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($credencial) {
            $this->fromArray($credencial);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE credenciais SET 
                    usuario = :usuario, 
                    hash = :hash, 
                    salt = :salt, 
                    cod_acesso = :cod_acesso 
                WHERE cod_credencial = :cod_credencial";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_credencial' => $this->getCodCredencial(),
                ':usuario' => $this->getUsuario(),
                ':hash' => $this->getHash(),
                ':salt' => $this->getSalt(),
                ':cod_acesso' => $this->getCodAcesso()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM credenciais WHERE cod_credencial = :cod_credencial";

        return database\Connection::executeDML(
            $sql,
            [':cod_credencial' => $this->getCodCredencial()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM credenciais";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "usuario";
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

        $credenciais = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $credenciais[] = new Credenciais(
                cod_credencial: $row['cod_credencial'],
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
