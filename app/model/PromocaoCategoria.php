<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class PromocaoCategoria extends Model {
    public const TABLE_NAME = "promocao_categoria";

    private int $cod_promo_cate;
    private float $porcentagem;
    private string $data_inicio;
    private string $data_termino;

    public function __construct(
        int $cod_promo_cate = 0,
        float $porcentagem = 0.0,
        string $data_inicio = "",
        string $data_termino = ""
    ) {
        $this->cod_promo_cate = $cod_promo_cate;
        $this->porcentagem = $porcentagem;
        $this->data_inicio = $data_inicio;
        $this->data_termino = $data_termino;
    }

    public function toArray(): array {
        return [
            "cod_promo_cate" => $this->cod_promo_cate,
            "porcentagem" => $this->porcentagem,
            "data_inicio" => $this->data_inicio,
            "data_termino" => $this->data_termino
        ];
    }

    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_promo_cate"])) {
                $this->setCodPromoCate($data["cod_promo_cate"]);
            }
            if (isset($data["porcentagem"])) {
                $this->setPorcentagem($data["porcentagem"]);
            }
            if (isset($data["data_inicio"])) {
                $this->setDataInicio($data["data_inicio"]);
            }
            if (isset($data["data_termino"])) {
                $this->setDataTermino($data["data_termino"]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodPromoCate(): int {
        return $this->cod_promo_cate;
    }

    public function setCodPromoCate(int $cod_promo_cate): void {
        $this->cod_promo_cate = $cod_promo_cate;
    }

    public function getPorcentagem(): float {
        return $this->porcentagem;
    }

    public function setPorcentagem(float $porcentagem): void {
        $this->porcentagem = $porcentagem;
    }

    public function getDataInicio(): string {
        return $this->data_inicio;
    }

    public function setDataInicio(string $data_inicio): void {
        $this->data_inicio = $data_inicio;
    }

    public function getDataTermino(): string {
        return $this->data_termino;
    }

    public function setDataTermino(string $data_termino): void {
        $this->data_termino = $data_termino;
    }

    // ================================================== CRUD Methods ==================================================

    public function create(): bool {
        $sql = "INSERT INTO promocao_categoria (porcentagem, data_inicio, data_termino)
                VALUES (:porcentagem, :data_inicio, :data_termino)";

        $result = database\Connection::executeDML(
            $sql, 
            [
                ':porcentagem' => $this->getPorcentagem(),
                ':data_inicio' => $this->getDataInicio(),
                ':data_termino' => $this->getDataTermino()
            ]
        );

        if ($result) {
            $this->setCodPromoCate(database\Connection::getInstance()->lastInsertId());
        }

        return $result;
    }

    public function read(): bool {
        $sql = "SELECT * FROM promocao_categoria WHERE cod_promo_cate = :cod_promo_cate";

        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_promo_cate" => $this->getCodPromoCate()]
        );

        $promocaoCategoria = $stmt->fetch(database\Connection::FETCH_ASSOC);

        if ($promocaoCategoria) {
            $this->fromArray($promocaoCategoria);
            return true;
        }

        return false;
    }

    public function update(): bool {
        $sql = "UPDATE promocao_categoria SET 
                    porcentagem = :porcentagem, 
                    data_inicio = :data_inicio, 
                    data_termino = :data_termino 
                WHERE cod_promo_cate = :cod_promo_cate";

        return database\Connection::executeDML(
            $sql,
            [
                ':cod_promo_cate' => $this->getCodPromoCate(),
                ':porcentagem' => $this->getPorcentagem(),
                ':data_inicio' => $this->getDataInicio(),
                ':data_termino' => $this->getDataTermino()
            ]
        );
    }

    public function delete(): bool {
        $sql = "DELETE FROM promocao_categoria WHERE cod_promo_cate = :cod_promo_cate";

        return database\Connection::executeDML(
            $sql,
            [':cod_promo_cate' => $this->getCodPromoCate()]
        );
    }

    public static function getAll(string | null $key, string $value = "", int $limit = 0, int $offset = 0): array {
        $sql = "SELECT * FROM promocao_categoria";
        $params = [];

        if ($key !== "") {
            $sanitizedKey = preg_replace('/[^a-zA-Z0-9_]/', '', $key);
        } else {
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

        $promocoesCategoria = [];

        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $promocoesCategoria[] = new PromocaoCategoria(
                cod_promo_cate: $row['cod_promo_cate'],
                porcentagem: (float)$row['porcentagem'],
                data_inicio: $row['data_inicio'],
                data_termino: $row['data_termino']
            );
        }

        return $promocoesCategoria;
    }
}
?>
