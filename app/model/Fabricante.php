<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Fabricante extends Model {
    public const TABLE_NAME = "fabricante";

    private int $id_fabric;
    private string $nome_fabric;
    private string $email;
    private string $cnpj;
    private ?string $website_url;

    public function __construct(
        int $id_fabric = 0,
        string $nome_fabric = "",
        string $email = "",
        string $cnpj = "",
        ?string $website_url = null
    ) {
        $this->id_fabric = $id_fabric;
        $this->nome_fabric = $nome_fabric;
        $this->email = $email;
        $this->cnpj = $cnpj;
        $this->website_url = $website_url;
    }

    public function toArray(): array {
        return [
            "id_fabric" => $this->id_fabric,
            "nome_fabric" => $this->nome_fabric,
            "email" => $this->email,
            "cnpj" => $this->cnpj,
            "website_url" => $this->website_url
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["id_fabric"])) {
                $this->setIdFabric($data["id_fabric"]);
            }
            if (isset($data["nome_fabric"])) {
                $this->setNomeFabric($data["nome_fabric"]);
            }
            if (isset($data["email"])) {
                $this->setEmail($data["email"]);
            }
            if (isset($data["cnpj"])) {
                $this->setCnpj($data["cnpj"]);
            }
            if (isset($data["website_url"])) {
                $this->setWebsiteUrl($data["website_url"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getIdFabric(): int {
        return $this->id_fabric;
    }

    public function setIdFabric(int $id_fabric): void {
        $this->id_fabric = $id_fabric;
    }

    public function getNomeFabric(): string {
        return $this->nome_fabric;
    }

    public function setNomeFabric(string $nome_fabric): void {
        $this->nome_fabric = $nome_fabric;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function setEmail(string $email): void {
        $this->email = $email;
    }

    public function getCnpj(): string {
        return $this->cnpj;
    }

    public function setCnpj(string $cnpj): void {
        $this->cnpj = $cnpj;
    }

    public function getWebsiteUrl(): ?string {
        return $this->website_url;
    }

    public function setWebsiteUrl(?string $website_url): void {
        $this->website_url = $website_url;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO fabricante (nome_fabric, email, cnpj, website_url) 
                VALUES (:nome_fabric, :email, :cnpj, :website_url)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':nome_fabric' => $this->getNomeFabric(),
                ':email' => $this->getEmail(),
                ':cnpj' => $this->getCnpj(),
                ':website_url' => $this->getWebsiteUrl()
            ]
        );

        if ($result) {
            $this->setIdFabric(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM fabricante WHERE id_fabric = :id_fabric";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":id_fabric" => $this->getIdFabric()]
        );

        $fabricante = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($fabricante) {
            $this->fromArray($fabricante);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE fabricante SET 
                    nome_fabric = :nome_fabric, 
                    email = :email, 
                    cnpj = :cnpj, 
                    website_url = :website_url 
                WHERE id_fabric = :id_fabric";

        return database\Connection::executeDML(
            $sql,
            [
                ':id_fabric' => $this->getIdFabric(),
                ':nome_fabric' => $this->getNomeFabric(),
                ':email' => $this->getEmail(),
                ':cnpj' => $this->getCnpj(),
                ':website_url' => $this->getWebsiteUrl()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM fabricante WHERE id_fabric = :id_fabric";

        return database\Connection::executeDML(
            $sql,
            [':id_fabric' => $this->getIdFabric()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM fabricante";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "nome_fabric";
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

        $fabricantes = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $fabricantes[] = new Fabricante(
                id_fabric: $row['id_fabric'],
                nome_fabric: $row['nome_fabric'],
                email: $row['email'],
                cnpj: $row['cnpj'],
                website_url: $row['website_url']
            );
        }

        return $fabricantes;
    }
}
?>
