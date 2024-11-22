<?php
namespace database;

class Connection extends \PDO
{
    private static ?self $conn = null;  // Singleton model (one instance for the whole project)

    /**
     * Private constructor to prevent the creation of instances outside of the class.
     * 
     * It reads the database configuration from the .env file and creates a connection to the database.
     * 
     * @throws RuntimeException If the .env file is not found.
     * @throws PDOException If the connection to the database fails.
     */
    private function __construct()
    {
        // Read the database configuration from the .env file
        $env = parse_ini_file(__DIR__ . "/../../config/.env");

        if (!(isset($env['HOST']) && 
            isset($env['DBNAME']) && 
            isset($env['USER']) && 
            isset($env['PASSWORD']))
            ) {
            throw new \RuntimeException("Error: .env file not found or some of the required variables are not set");
        }

        // Create the DSN string
        $dsn = "mysql:host={$env['HOST']};dbname={$env['DBNAME']};charset=utf8";

        try {
            // Create a PDO connection
            parent::__construct($dsn, $env['USER'], $env['PASSWORD']);

            // Set the error mode to throw exceptions
            $this->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            // Set the default fetch mode to associative arrays
            $this->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            // Throw an exception if the connection fails
            throw new \PDOException("Error connecting to the database: " . $e->getMessage());
        }
    }

    // Prevent cloning the instance
    private function __clone() {}
    private function __wakeup() {}


    /**
     * Method to get the connection
     * 
     * Uses the singleton design pattern to ensure only one connection is created for the whole project.
     * 
     * @return Connection The connection instance
     */
    public static function getInstance(): Connection
    {
        if (self::$conn === null) {
            self::$conn = new Connection();
        }
        return self::$conn;
    }

    /**
     * Method to execute Data Definition Language (DQL) queries using prepared statements
     * 
     * This method should only be used for 'select' operations.
     * Returns the PDOStatement object, so you can use it to fetch the results.
     * 
     * @param string $query The SQL query to be executed
     * @param array $params The parameters to bind to the query
     * @return PDOStatement|null The PDOStatement object, or null if the query failed
     */
    public static function executeDQL(string $query, array $params = []): ?\PDOStatement
    {
        try {
            $stmt = self::getInstance()->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (\PDOException $e) {
            throw new \PDOException("Error executing the query (DQL): " . $e->getMessage());
        }
    }

    /**
     * Executes a Data Manipulation Language (DML) query using prepared statements.
     *
     * This method should not be used for 'select' operations.
     * Returns true if the execution was successful, otherwise throws an exception.
     *
     * @param string $query The SQL query to be executed
     * @param array $params The parameters to bind to the query
     * @return bool True if the execution was successful
     * @throws PDOException If there is an error executing the query
     */
    public static function executeDML(string $query, array $params = []): bool
    {
        try {
            $stmt = self::getInstance()->prepare($query);
            return $stmt->execute($params);
        } catch (\PDOException $e) {
            throw new \PDOException("Error executing the query (DML): " . $e->getMessage());
        }
    }

    /**
     * Method to get the metadata of a table
     * 
     * Returns an array of associative arrays, where each associative array represents
     * a column of the table, with the keys 'Field', 'Type', 'Null', 'Key', 'Default'
     * and 'Extra'
     * 
     * @param string $tableName The name of the table
     * @return array The metadata of the table
     * @throws PDOException If an error occurs while executing the query
     */
    public static function getTableMetadata(string $tableName): array
    {
        try {
            // Sanitize the table name to prevent SQL injection
            $sanitizedTableName = preg_replace('/[^a-zA-Z0-9_]/', '', $tableName);
            $stmt = self::getInstance()->prepare("SHOW COLUMNS FROM $sanitizedTableName");
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \PDOException("Error getting the metadata of the table: " . $e->getMessage());
        }
    }

    /**
     * Gets a list of all tables in the database
     * 
     * Returns an array with the names of all tables in the database
     * 
     * @return array The list of tables
     */
    public static function getTables(): array
    {
        try {
            $stmt = self::getInstance()->query("SHOW TABLES");
            return $stmt->fetchAll(\PDO::FETCH_COLUMN);
        } catch (\PDOException $e) {
            throw new \PDOException("Error getting the list of tables: " . $e->getMessage(), $e->getCode(), $e);
        }
    }
}

?>

