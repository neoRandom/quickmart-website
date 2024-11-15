<?php

class Connection extends PDO
{
    private static ?Connection $conn = null;  // Singleton model (one instance for the whole project)
    private string $host = "127.0.0.1";
    private string $user = "root";
    private string $password = "";
    private string $dbname = "minimercado";

    private function __construct()
    {
        $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8";
        try {
            parent::__construct($dsn, $this->user, $this->password);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new PDOException("Erro ao conectar ao banco de dados");
        }
    }

    // Method to get the connection
    public static function getInstance(): Connection
    {
        if (self::$conn === null) {
            self::$conn = new Connection();
        }
        return self::$conn;
    }

    /** Method to execute queries (DQL) with prepared statements
     * 
     * Returns the Statement, so use it with 'select' operations
     */
    public function executeDQL(string $query, array $params = []): ?PDOStatement
    {
        try {
            $stmt = $this->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new PDOException("Erro ao executar a query (DQL): " . $e->getMessage());
        }
    }

    /** Method to execute queries (DML) with prepared statements
     * 
     * Returns true if the execution was successful, so don't use it with 'select' operations
     */
    public function executeDML(string $query, array $params = []): bool
    {
        try {
            $stmt = $this->prepare($query);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            throw new PDOException("Erro ao executar a query (DML): " . $e->getMessage());
        }
        return false;
    }
}

?>
