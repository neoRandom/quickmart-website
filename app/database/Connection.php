<?php

class Connection extends PDO
{
    private static ?Connection $conn = null;  // Singleton model (one instance for the whole project)

    private function __construct()
    {
        $env = parse_ini_file(__DIR__ . "../../config/.env");

        if (!(isset($env['HOST']) && 
            isset($env['DBNAME']) && 
            isset($env['USER']) && 
            isset($env['PASSWORD']))
            ) {
            throw new RuntimeException("Error: .env file not found");
        }
        $dsn = "mysql:host={$env['HOST']};dbname={$env['DBNAME']};charset=utf8";
        try {
            parent::__construct($dsn, $env['USER'], $env['PASSWORD']);
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new PDOException("Error connecting to the database: " . $e->getMessage());
        }
    }

    private function __clone() {}
    private function __wakeup() {}


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
    public static function executeDQL(string $query, array $params = []): ?PDOStatement
    {
        try {
            $stmt = self::getInstance()->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new PDOException("Error executing the query (DQL): " . $e->getMessage());
        }
    }

    /** Method to execute queries (DML) with prepared statements
     * 
     * Returns true if the execution was successful, so don't use it with 'select' operations
     */
    public static function executeDML(string $query, array $params = []): bool
    {
        try {
            $stmt = self::getInstance()->prepare($query);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            throw new PDOException("Error executing the query (DML): " . $e->getMessage());
        }
        return false;
    }
}

?>
