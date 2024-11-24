<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Cargo extends Model {
    public const TABLE_NAME = "cargo";
    private int $cod_cargo;
    private string $descricao;
    private float $salario;

    public function __construct(
        int $cod_cargo = 0,
        string $descricao = "",
        float $salario = 0.0
    ) {
        $this->cod_cargo = $cod_cargo;
        $this->descricao = $descricao;
        $this->salario = $salario;
    }

    public function toArray(): array {
        return [
            "cod_cargo" => $this->cod_cargo,
            "descricao" => $this->descricao,
            "salario" => $this->salario
        ];
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodCargo(): int {
        return $this->cod_cargo;
    }

    public function setCodCargo(int $cod_cargo): void {
        $this->cod_cargo = $cod_cargo;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function setDescricao(string $descricao): void {
        $this->descricao = $descricao;
    }

    public function getSalario(): float {
        return $this->salario;
    }

    public function setSalario(float $salario): void {
        $this->salario = $salario;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO cargo (descricao, salario) 
                VALUES (:descricao, :salario)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':descricao' => $this->getDescricao(),
                ':salario' => $this->getSalario()
            ]
        );

        if ($result) {
            $this->setCodCargo(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM cargo WHERE cod_cargo = :cod_cargo";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_cargo" => $this->getCodCargo()]
        );

        $cargo = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($cargo) {
            $this->setCodCargo($cargo['cod_cargo']);
            $this->setDescricao($cargo['descricao']);
            $this->setSalario($cargo['salario']);
            
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE cargo SET 
                    descricao = :descricao, 
                    salario = :salario 
                WHERE cod_cargo = :cod_cargo";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_cargo' => $this->getCodCargo(),
                ':descricao' => $this->getDescricao(),
                ':salario' => $this->getSalario()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM cargo WHERE cod_cargo = :cod_cargo";

        return database\Connection::executeDML(
            $sql,
            [':cod_cargo' => $this->getCodCargo()]
        );
    }

    public static function getAll(string $value = ""): array {
        if ($value !== "") {
            $sql = "SELECT * FROM cargo WHERE descricao LIKE :descricao";
            $stmt = database\Connection::executeDQL(
                $sql,
                [':descricao' => "%$value%"]
            );
        } else {
            $sql = "SELECT * FROM cargo";
            $stmt = database\Connection::executeDQL($sql);
        }

        if ($stmt === null) {
            throw new \PDOException("Erro ao executar a consulta SQL");
        }

        $cargos = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            if ($row === false) {
                throw new \PDOException("Erro ao ler o registro da consulta SQL");
            }

            $cargos[] = new Cargo(
                cod_cargo: $row['cod_cargo'],
                descricao: $row['descricao'],
                salario: (float)$row['salario']
            );
        }

        return $cargos;
    }
}

?>