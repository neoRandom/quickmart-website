<?php

class Produto {
    private int $codProd;
    private int $codCate;
    private int $codPromoProd;
    private int $codClassific;
    private int $idFabric;
    private string $nome;
    private ?string $descricao;
    private int $estoque;
    private float $preco;
    private Connection $db;


    // Class constructor, includes a Connection object
    public function __construct(
        int $codProd = 0,
        int $codCate = 0,
        int $codPromoProd = 0,
        int $codClassific = 0,
        int $idFabric = 0,
        string $nome = '',
        ?string $descricao = null,
        int $estoque = 0,
        float $preco = 0.0
    ) {
        $this->db = Connection::getInstance();
        $this->codProd = $codProd;
        $this->codCate = $codCate;
        $this->codPromoProd = $codPromoProd;
        $this->codClassific = $codClassific;
        $this->idFabric = $idFabric;
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->estoque = $estoque;
        $this->preco = $preco;
    }

    // ================================================== Getters and Setters ==================================================

    public function getCodProd(): int {
        return $this->codProd;
    }

    public function setCodProd(int $codProd): void {
        $this->codProd = $codProd;
    }

    public function getCodCate(): int {
        return $this->codCate;
    }

    public function setCodCate(int $codCate): void {
        $this->codCate = $codCate;
    }

    public function getCodPromoProd(): int {
        return $this->codPromoProd;
    }

    public function setCodPromoProd(int $codPromoProd): void {
        $this->codPromoProd = $codPromoProd;
    }

    public function getCodClassific(): int {
        return $this->codClassific;
    }

    public function setCodClassific(int $codClassific): void {
        $this->codClassific = $codClassific;
    }

    public function getIdFabric(): int {
        return $this->idFabric;
    }

    public function setIdFabric(int $idFabric): void {
        $this->idFabric = $idFabric;
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

    // Inserts a new Produto into the database
    public function create(): bool {
        $sql = "INSERT INTO produto (cod_cate, cod_promo_prod, cod_classific, id_fabric, nome, descricao, estoque, preco)
                VALUES (:codCate, :codPromoProd, :codClassific, :idFabric, :nome, :descricao, :estoque, :preco)";
        
        $result = $this->db->executeDML(
            $sql,
            [
                ':codCate' => $this->getCodCate(),
                ':codPromoProd' => $this->getCodPromoProd(),
                ':codClassific' => $this->getCodClassific(),
                ':idFabric' => $this->getIdFabric(),
                ':nome' => $this->getNome(),
                ':descricao' => $this->getDescricao(),
                ':estoque' => $this->getEstoque(),
                ':preco' => $this->getPreco()
            ]
        );

        if ($result == true) {
            $this->setCodProd($this->db->lastInsertId());
        }

        return $result;
    }

    // Searchs for a certain Produto in the database
    public function read(): bool {
        $sql = "SELECT * FROM produto WHERE cod_prod = :codProd";
        $stmt = $this->db->executeDQL(
            $sql, 
            [":codProd" => $this->getCodProd()]
        );

        $produto = $stmt->fetch(Connection::FETCH_ASSOC);
        if ($produto) {
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

    // Updates the existing Produto
    public function update(): bool {
        $sql = "UPDATE produto SET
                    cod_cate = :codCate,
                    cod_promo_prod = :codPromoProd,
                    cod_classific = :codClassific,
                    id_fabric = :idFabric,
                    nome = :nome,
                    descricao = :descricao,
                    estoque = :estoque,
                    preco = :preco
                WHERE cod_prod = :codProd";
        
        return $this->db->executeDML(
            $sql,
            [
                ':codProd' => $this->getCodProd(),
                ':codCate' => $this->getCodCate(),
                ':codPromoProd' => $this->getCodPromoProd(),
                ':codClassific' => $this->getCodClassific(),
                ':idFabric' => $this->getIdFabric(),
                ':nome' => $this->getNome(),
                ':descricao' => $this->getDescricao(),
                ':estoque' => $this->getEstoque(),
                ':preco' => $this->getPreco()
            ]
        );
    }

    // Deletes the current Produto from the database
    public function delete(): bool {
        $sql = "DELETE FROM produto WHERE cod_prod = :codProd";
        return $this->db->executeDML(
            $sql, 
            [':codProd' => $this->codProd]
        );
    }

    // ========================= Table-scoped Methods =========================

    public static function getAll(): array {
        $conn = Connection::getInstance();

        $sql = "SELECT * FROM produto";

        $stmt = $conn->executeDQL($sql);

        $produtos = [];

        // For each register found, create a new Produto instance
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $produtos[] = new Produto(
                codCate: $row['cod_cate'],
                codPromoProd: $row['cod_promo_prod'],
                codClassific: $row['cod_classific'],
                idFabric: $row['id_fabric'],
                nome: $row['nome'],
                descricao: $row['descricao'],
                estoque: $row['estoque'],
                preco: (float) $row['preco'],
                codProd: $row['cod_prod']
            );
        }

        return $produtos;
    }
}

?>
