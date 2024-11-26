<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Cliente extends Model {
    public const TABLE_NAME = "cliente";

    private int $id_cliente;
    private string $nome_cli;
    private string $data_nasc;
    private string $cpf;
    private string $rg;
    private string $endereco;

    public function __construct(
        int $id_cliente = 0,
        string $nome_cli = "",
        string $data_nasc = "",
        string $cpf = "",
        string $rg = "",
        string $endereco = ""
    ) {
        $this->id_cliente = $id_cliente;
        $this->nome_cli = $nome_cli;
        $this->data_nasc = $data_nasc;
        $this->cpf = $cpf;
        $this->rg = $rg;
        $this->endereco = $endereco;
    }

    public function toArray(): array {
        return [
            "id_cliente" => $this->id_cliente,
            "nome_cli" => $this->nome_cli,
            "data_nasc" => $this->data_nasc,
            "cpf" => $this->cpf,
            "rg" => $this->rg,
            "endereco" => $this->endereco
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["id_cliente"])) {
                $this->setIdCliente($data["id_cliente"]);
            }
            if (isset($data["nome_cli"])) {
                $this->setNomeCli($data["nome_cli"]);
            }
            if (isset($data["data_nasc"])) {
                $this->setDataNasc($data["data_nasc"]);
            }
            if (isset($data["cpf"])) {
                $this->setCpf($data["cpf"]);
            }
            if (isset($data["rg"])) {
                $this->setRg($data["rg"]);
            }
            if (isset($data["endereco"])) {
                $this->setEndereco($data["endereco"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getIdCliente(): int {
        return $this->id_cliente;
    }

    public function setIdCliente(int $id_cliente): void {
        $this->id_cliente = $id_cliente;
    }

    public function getNomeCli(): string {
        return $this->nome_cli;
    }

    public function setNomeCli(string $nome_cli): void {
        $this->nome_cli = $nome_cli;
    }

    public function getDataNasc(): string {
        return $this->data_nasc;
    }

    public function setDataNasc(string $data_nasc): void {
        $this->data_nasc = $data_nasc;
    }

    public function getCpf(): string {
        return $this->cpf;
    }

    public function setCpf(string $cpf): void {
        $this->cpf = $cpf;
    }

    public function getRg(): string {
        return $this->rg;
    }

    public function setRg(string $rg): void {
        $this->rg = $rg;
    }

    public function getEndereco(): string {
        return $this->endereco;
    }

    public function setEndereco(string $endereco): void {
        $this->endereco = $endereco;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO cliente (nome_cli, data_nasc, cpf, rg, endereco) 
                VALUES (:nome_cli, :data_nasc, :cpf, :rg, :endereco)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':nome_cli' => $this->getNomeCli(),
                ':data_nasc' => $this->getDataNasc(),
                ':cpf' => $this->getCpf(),
                ':rg' => $this->getRg(),
                ':endereco' => $this->getEndereco()
            ]
        );

        if ($result) {
            $this->setIdCliente(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM cliente WHERE id_cliente = :id_cliente";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":id_cliente" => $this->getIdCliente()]
        );

        $cliente = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($cliente) {
            $this->fromArray($cliente);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE cliente SET 
                    nome_cli = :nome_cli,
                    data_nasc = :data_nasc,
                    cpf = :cpf,
                    rg = :rg,
                    endereco = :endereco
                WHERE id_cliente = :id_cliente";

        return database\Connection::executeDML(
            $sql,
            [
                ':id_cliente' => $this->getIdCliente(),
                ':nome_cli' => $this->getNomeCli(),
                ':data_nasc' => $this->getDataNasc(),
                ':cpf' => $this->getCpf(),
                ':rg' => $this->getRg(),
                ':endereco' => $this->getEndereco()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM cliente WHERE id_cliente = :id_cliente";

        return database\Connection::executeDML(
            $sql,
            [':id_cliente' => $this->getIdCliente()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM cliente";
        $params = [];
        
        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        }
        else {
            $sanitizedKey = "nome_cli";
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

        $clientes = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $clientes[] = new Cliente(
                id_cliente: $row['id_cliente'],
                nome_cli: $row['nome_cli'],
                data_nasc: $row['data_nasc'],
                cpf: $row['cpf'],
                rg: $row['rg'],
                endereco: $row['endereco']
            );
        }

        return $clientes;
    }
}
?>
