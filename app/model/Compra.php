<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Compra extends Model {
    public const TABLE_NAME = "compra";

    private int $cod_compra;
    private int $id_func;
    private int $id_cliente;
    private string $data_compra;
    private int $metodo_pag;
    private float $preco_bruto;
    private float $valor_desconto;

    public function __construct(
        int $cod_compra = 0,
        int $id_func = 0,
        int $id_cliente = 0,
        string $data_compra = "",
        int $metodo_pag = 0,
        float $preco_bruto = 0.0,
        float $valor_desconto = 0.0
    ) {
        $this->cod_compra = $cod_compra;
        $this->id_func = $id_func;
        $this->id_cliente = $id_cliente;
        $this->data_compra = $data_compra;
        $this->metodo_pag = $metodo_pag;
        $this->preco_bruto = $preco_bruto;
        $this->valor_desconto = $valor_desconto;
    }

    public function toArray(): array {
        return [
            "cod_compra" => $this->cod_compra,
            "id_func" => $this->id_func,
            "id_cliente" => $this->id_cliente,
            "data_compra" => $this->data_compra,
            "metodo_pag" => $this->metodo_pag,
            "preco_bruto" => $this->preco_bruto,
            "valor_desconto" => $this->valor_desconto
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_compra"])) {
                $this->setCodCompra($data["cod_compra"]);
            }
            if (isset($data["id_func"])) {
                $this->setIdFunc($data["id_func"]);
            }
            if (isset($data["id_cliente"])) {
                $this->setIdCliente($data["id_cliente"]);
            }
            if (isset($data["data_compra"])) {
                $this->setDataCompra($data["data_compra"]);
            }
            if (isset($data["metodo_pag"])) {
                $this->setMetodoPag($data["metodo_pag"]);
            }
            if (isset($data["preco_bruto"])) {
                $this->setPrecoBruto($data["preco_bruto"]);
            }
            if (isset($data["valor_desconto"])) {
                $this->setValorDesconto($data["valor_desconto"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodCompra(): int {
        return $this->cod_compra;
    }

    public function setCodCompra(int $cod_compra): void {
        $this->cod_compra = $cod_compra;
    }

    public function getIdFunc(): int {
        return $this->id_func;
    }

    public function setIdFunc(int $id_func): void {
        $this->id_func = $id_func;
    }

    public function getIdCliente(): int {
        return $this->id_cliente;
    }

    public function setIdCliente(int $id_cliente): void {
        $this->id_cliente = $id_cliente;
    }

    public function getDataCompra(): string {
        return $this->data_compra;
    }

    public function setDataCompra(string $data_compra): void {
        $this->data_compra = $data_compra;
    }

    public function getMetodoPag(): int {
        return $this->metodo_pag;
    }

    public function setMetodoPag(int $metodo_pag): void {
        $this->metodo_pag = $metodo_pag;
    }

    public function getPrecoBruto(): float {
        return $this->preco_bruto;
    }

    public function setPrecoBruto(float $preco_bruto): void {
        $this->preco_bruto = $preco_bruto;
    }

    public function getValorDesconto(): float {
        return $this->valor_desconto;
    }

    public function setValorDesconto(float $valor_desconto): void {
        $this->valor_desconto = $valor_desconto;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO compra (id_func, id_cliente, data_compra, metodo_pag, preco_bruto, valor_desconto) 
                VALUES (:id_func, :id_cliente, :data_compra, :metodo_pag, :preco_bruto, :valor_desconto)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':id_func' => $this->getIdFunc(),
                ':id_cliente' => $this->getIdCliente(),
                ':data_compra' => $this->getDataCompra(),
                ':metodo_pag' => $this->getMetodoPag(),
                ':preco_bruto' => $this->getPrecoBruto(),
                ':valor_desconto' => $this->getValorDesconto()
            ]
        );

        if ($result) {
            $this->setCodCompra(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM compra WHERE cod_compra = :cod_compra";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_compra" => $this->getCodCompra()]
        );

        $compra = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($compra) {
            $this->fromArray($compra);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE compra SET 
                    id_func = :id_func,
                    id_cliente = :id_cliente,
                    data_compra = :data_compra,
                    metodo_pag = :metodo_pag,
                    preco_bruto = :preco_bruto,
                    valor_desconto = :valor_desconto
                WHERE cod_compra = :cod_compra";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_compra' => $this->getCodCompra(),
                ':id_func' => $this->getIdFunc(),
                ':id_cliente' => $this->getIdCliente(),
                ':data_compra' => $this->getDataCompra(),
                ':metodo_pag' => $this->getMetodoPag(),
                ':preco_bruto' => $this->getPrecoBruto(),
                ':valor_desconto' => $this->getValorDesconto()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM compra WHERE cod_compra = :cod_compra";

        return database\Connection::executeDML(
            $sql,
            [':cod_compra' => $this->getCodCompra()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM compra";
        $params = [];
        
        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        }
        else {
            $sanitizedKey = "data_compra";
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

        $compras = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $compras[] = new Compra(
                cod_compra: $row['cod_compra'],
                id_func: $row['id_func'],
                id_cliente: $row['id_cliente'],
                data_compra: $row['data_compra'],
                metodo_pag: $row['metodo_pag'],
                preco_bruto: (float)$row['preco_bruto'],
                valor_desconto: (float)$row['valor_desconto']
            );
        }

        return $compras;
    }
}
?>
