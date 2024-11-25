<?php
namespace model;

use database;

require_once __DIR__ . "/Model.php";

class Produto extends Model {
    public const TABLE_NAME = "produto";
    private int $cod_prod;
    private int $cod_cate;
    private int $cod_promo_prod;
    private int $cod_classific;
    private int $id_fabric;
    private string $nome;
    private ?string $descricao;
    private int $estoque;
    private float $preco;


    // Class constructor, includes a Connection object
    public function __construct(
        int $cod_prod = 0,
        int $cod_cate = 0,
        int $cod_promo_prod = 0,
        int $cod_classific = 0,
        int $id_fabric = 0,
        string $nome = '',
        ?string $descricao = null,
        int $estoque = 0,
        float $preco = 0.0
    ) {
        $this->cod_prod = $cod_prod;
        $this->cod_cate = $cod_cate;
        $this->cod_promo_prod = $cod_promo_prod;
        $this->cod_classific = $cod_classific;
        $this->id_fabric = $id_fabric;
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->estoque = $estoque;
        $this->preco = $preco;
    }

    public function toArray(): array {
        return [
            "cod_prod" => $this->cod_prod,
            "cod_cate" => $this->cod_cate,
            "cod_promo_prod" => $this->cod_promo_prod,
            "cod_classific" => $this->cod_classific,
            "id_fabric" => $this->id_fabric,
            "nome" => $this->nome,
            "descricao" => $this->descricao,
            "estoque" => $this->estoque,
            "preco" => $this->preco
        ];
    }

    /**
     * Sets the properties of the current Produto instance from an array.
     * The array must contain the following keys:
     * - cod_prod
     * - cod_cate
     * - cod_promo_prod
     * - cod_classific
     * - id_fabric
     * - nome
     * - descricao
     * - estoque
     * - preco
     *
     * @param array $data An array containing the data to set
     */
    public function fromArray(array $data): bool {
        try {
            if (isset($data["cod_prod"])) {
                $this->setCodProd($data["cod_prod"]);
            }
            if (isset($data["cod_cate"])) {
                $this->setCodCate($data["cod_cate"]);
            }
            if (isset($data["cod_promo_prod"])) {
                $this->setCodPromoProd($data["cod_promo_prod"]);
            }
            if (isset($data["cod_classific"])) {
                $this->setCodClassific($data["cod_classific"]);
            }
            if (isset($data["id_fabric"])) {
                $this->setIdFabric($data["id_fabric"]);
            }
            if (isset($data["nome"])) {
                $this->setNome($data["nome"]);
            }
            if (isset($data["descricao"])) {
                $this->setDescricao($data["descricao"] ?? "");
            }
            if (isset($data["estoque"])) {
                $this->setEstoque($data["estoque"]);
            }
            if (isset($data["preco"])) {
                $this->setPreco($data["preco"]);
            }
            return true;
        }
        catch (\Exception $e) {
            return false;
        }
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodProd(): int {
        return $this->cod_prod;
    }

    public function setCodProd(int $cod_prod): void {
        $this->cod_prod = $cod_prod;
    }

    public function getCodCate(): int {
        return $this->cod_cate;
    }

    public function setCodCate(int $cod_cate): void {
        $this->cod_cate = $cod_cate;
    }

    public function getCodPromoProd(): int {
        return $this->cod_promo_prod;
    }

    public function setCodPromoProd(int $cod_promo_prod): void {
        $this->cod_promo_prod = $cod_promo_prod;
    }

    public function getCodClassific(): int {
        return $this->cod_classific;
    }

    public function setCodClassific(int $cod_classific): void {
        $this->cod_classific = $cod_classific;
    }

    public function getIdFabric(): int {
        return $this->id_fabric;
    }

    public function setIdFabric(int $id_fabric): void {
        $this->id_fabric = $id_fabric;
    }

    public function getNome(): string {
        return $this->nome;
    }

    public function setNome(string $nome): void {
        $this->nome = $nome;
    }

    public function getDescricao(): ?string {
        return $this->descricao;
    }

    public function setDescricao(?string $descricao): void {
        $this->descricao = $descricao;
    }

    public function getEstoque(): int {
        return $this->estoque;
    }

    public function setEstoque(int $estoque): void {
        $this->estoque = $estoque;
    }

    public function getPreco(): float {
        return $this->preco;
    }

    public function setPreco(float $preco): void {
        $this->preco = $preco;
    }

    // ================================================== CRUD Methods ==================================================

    // ========================= Object-scoped Methods =========================

    /**
     * Inserts a new Produto into the database
     * 
     * @return bool True if the insertion was successful, false otherwise
     */
    public function create(): bool {
        $sql = "INSERT INTO produto (cod_cate, cod_promo_prod, cod_classific, id_fabric, nome, descricao, estoque, preco)
                VALUES (:cod_cate, :cod_promo_prod, :cod_classific, :id_fabric, :nome, :descricao, :estoque, :preco)";
        
        // Execute the insertion query
        $result = database\Connection::executeDML(
            $sql,
            [
                ':cod_cate' => $this->getCodCate(),
                ':cod_promo_prod' => $this->getCodPromoProd(),
                ':cod_classific' => $this->getCodClassific(),
                ':id_fabric' => $this->getIdFabric(),
                ':nome' => $this->getNome(),
                ':descricao' => $this->getDescricao(),
                ':estoque' => $this->getEstoque(),
                ':preco' => $this->getPreco()
            ]
        );

        // If the insertion was successful, set the cod_prod attribute with the last inserted ID
        if ($result == true) {
            $this->setCodProd(database\Connection::getInstance()->lastInsertId());
        }

        // Return the result of the insertion
        return $result;
    }

    /**
     * Searches for a certain Produto in the database
     * 
     * @return bool True if the Produto was found, false otherwise
     */
    public function read(): bool {
        $sql = "SELECT * FROM produto WHERE cod_prod = :cod_prod";
        $stmt = database\Connection::executeDQL(
            $sql, 
            [":cod_prod" => $this->getCodProd()]
        );

        $produto = $stmt->fetch(database\Connection::FETCH_ASSOC);
        if ($produto) {
            // Assign the attributes of the found Produto to the current object
            $this->setCodProd($produto['cod_prod']);
            $this->setCodCate($produto['cod_cate']);
            $this->setCodPromoProd($produto['cod_promo_prod']);
            $this->setCodClassific($produto['cod_classific']);
            $this->setIdFabric($produto['id_fabric']);
            $this->setNome($produto['nome']);
            $this->setDescricao($produto['descricao']);
            $this->setEstoque($produto['estoque']);
            $this->setPreco((float) $produto['preco']);

            return true;
        }

        return false;
    }

    /**
     * Updates the existing Produto in the database
     * 
     * @return bool True if the update was successful, false otherwise
     */
    public function update(): bool {
        $sql = "UPDATE produto SET
                    // Update the fields of the produto table
                    cod_cate = :cod_cate,
                    cod_promo_prod = :cod_promo_prod,
                    cod_classific = :cod_classific,
                    id_fabric = :id_fabric,
                    nome = :nome,
                    descricao = :descricao,
                    estoque = :estoque,
                    preco = :preco
                WHERE cod_prod = :cod_prod";
        
        // Execute the update query
        return database\Connection::executeDML(
            $sql,
            [
                ':cod_prod' => $this->getCodProd(),
                ':cod_cate' => $this->getCodCate(),
                ':cod_promo_prod' => $this->getCodPromoProd(),
                ':cod_classific' => $this->getCodClassific(),
                ':id_fabric' => $this->getIdFabric(),
                ':nome' => $this->getNome(),
                ':descricao' => $this->getDescricao(),
                ':estoque' => $this->getEstoque(),
                ':preco' => $this->getPreco()
            ]
        );
    }

    /**
     * Deletes the current Produto from the database.
     * 
     * @return bool True if the deletion was successful, false otherwise
     */
    public function delete(): bool {
        // SQL query to delete the produto record based on cod_prod
        $sql = "DELETE FROM produto WHERE cod_prod = :cod_prod";
        
        // Execute the deletion query
        return database\Connection::executeDML(
            $sql, 
            [':cod_prod' => $this->cod_prod]
        );
    }

    // ========================= Table-scoped Methods =========================

    /**
     * Returns an array of all Produto instances in the database that match the given value in the name
     * 
     * If no value is provided, it returns all Produtos
     * 
     * @param string $value The value to search for in the name
     * @return array An array of Produto instances
     */
    public static function getAll(string $value = ""): array {
        if ($value !== "") {
            $sql = "SELECT * FROM produto WHERE nome LIKE :nome";

            $stmt = database\Connection::executeDQL(
                $sql, 
                [':nome' => "%$value%"]
            );
        }
        else {
            $sql = "SELECT * FROM produto";

            $stmt = database\Connection::executeDQL(
                $sql
            );
        }

        if ($stmt === null) {
            throw new \PDOException("Erro ao executar a consulta SQL");
        }

        $produtos = [];

        // For each register found, create a new Produto instance
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            if ($row === false) {
                throw new \PDOException("Erro ao ler o registro da consulta SQL");
            }

            $produtos[] = new Produto(
                cod_cate: $row['cod_cate'],
                cod_promo_prod: $row['cod_promo_prod'],
                cod_classific: $row['cod_classific'],
                id_fabric: $row['id_fabric'],
                nome: $row['nome'],
                descricao: $row['descricao'],
                estoque: $row['estoque'],
                preco: (float) $row['preco'],
                cod_prod: $row['cod_prod']
            );
        }

        return $produtos;
    }
}

?>
