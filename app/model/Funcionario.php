<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Funcionario extends Model {
    public const TABLE_NAME = "funcionario";

    private int $id_func;
    private string $nome_func;
    private string $data_nasc;
    private string $cpf;
    private string $rg;
    private string $endereco;
    private int $cod_cargo;
    private int $cod_expediente;

    public function __construct(
        int $id_func = 0,
        string $nome_func = "",
        string $data_nasc = "",
        string $cpf = "",
        string $rg = "",
        string $endereco = "",
        int $cod_cargo = 0,
        int $cod_expediente = 0
    ) {
        $this->id_func = $id_func;
        $this->nome_func = $nome_func;
        $this->data_nasc = $data_nasc;
        $this->cpf = $cpf;
        $this->rg = $rg;
        $this->endereco = $endereco;
        $this->cod_cargo = $cod_cargo;
        $this->cod_expediente = $cod_expediente;
    }

    public function toArray(): array {
        return [
            "id_func" => $this->id_func,
            "nome_func" => $this->nome_func,
            "data_nasc" => $this->data_nasc,
            "cpf" => $this->cpf,
            "rg" => $this->rg,
            "endereco" => $this->endereco,
            "cod_cargo" => $this->cod_cargo,
            "cod_expediente" => $this->cod_expediente
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["id_func"])) {
                $this->setIdFunc($data["id_func"]);
            }
            if (isset($data["nome_func"])) {
                $this->setNomeFunc($data["nome_func"]);
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
            if (isset($data["cod_cargo"])) {
                $this->setCodCargo($data["cod_cargo"]);
            }
            if (isset($data["cod_expediente"])) {
                $this->setCodExpediente($data["cod_expediente"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getIdFunc(): int {
        return $this->id_func;
    }

    public function setIdFunc(int $id_func): void {
        $this->id_func = $id_func;
    }

    public function getNomeFunc(): string {
        return $this->nome_func;
    }

    public function setNomeFunc(string $nome_func): void {
        $this->nome_func = $nome_func;
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

    public function getCodCargo(): int {
        return $this->cod_cargo;
    }

    public function setCodCargo(int $cod_cargo): void {
        $this->cod_cargo = $cod_cargo;
    }

    public function getCodExpediente(): int {
        return $this->cod_expediente;
    }

    public function setCodExpediente(int $cod_expediente): void {
        $this->cod_expediente = $cod_expediente;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO funcionario (nome_func, data_nasc, cpf, rg, endereco, cod_cargo, cod_expediente) 
                VALUES (:nome_func, :data_nasc, :cpf, :rg, :endereco, :cod_cargo, :cod_expediente)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':nome_func' => $this->getNomeFunc(),
                ':data_nasc' => $this->getDataNasc(),
                ':cpf' => $this->getCpf(),
                ':rg' => $this->getRg(),
                ':endereco' => $this->getEndereco(),
                ':cod_cargo' => $this->getCodCargo(),
                ':cod_expediente' => $this->getCodExpediente()
            ]
        );

        if ($result) {
            $this->setIdFunc(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM funcionario WHERE id_func = :id_func";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":id_func" => $this->getIdFunc()]
        );

        $funcionario = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($funcionario) {
            $this->fromArray($funcionario);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE funcionario SET 
                    nome_func = :nome_func, 
                    data_nasc = :data_nasc, 
                    cpf = :cpf, 
                    rg = :rg, 
                    endereco = :endereco, 
                    cod_cargo = :cod_cargo, 
                    cod_expediente = :cod_expediente 
                WHERE id_func = :id_func";

        return database\Connection::executeDML(
            $sql,
            [
                ':id_func' => $this->getIdFunc(),
                ':nome_func' => $this->getNomeFunc(),
                ':data_nasc' => $this->getDataNasc(),
                ':cpf' => $this->getCpf(),
                ':rg' => $this->getRg(),
                ':endereco' => $this->getEndereco(),
                ':cod_cargo' => $this->getCodCargo(),
                ':cod_expediente' => $this->getCodExpediente()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM funcionario WHERE id_func = :id_func";

        return database\Connection::executeDML(
            $sql,
            [':id_func' => $this->getIdFunc()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM funcionario";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
            $sanitizedKey = "nome_func";
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

        $funcionarios = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $funcionarios[] = new Funcionario(
                id_func: $row['id_func'],
                nome_func: $row['nome_func'],
                data_nasc: $row['data_nasc'],
                cpf: $row['cpf'],
                rg: $row['rg'],
                endereco: $row['endereco'],
                cod_cargo: $row['cod_cargo'],
                cod_expediente: $row['cod_expediente']
            );
        }

        return $funcionarios;
    }
}
?>
