<?php
use database\Connection;

require_once __DIR__ . "/../autoload.php";

class AdminController
{
    public static function loadAdmin()
    {
        // TODO: Remove this comment before launch
        // if (!Authentication::validateAdmin()) {
        //     header("HTTP/1.1 401 Unauthorized");
        //     Authentication::redirectLogin("admin/login");
        // }

        require_once __DIR__ . "/../view/admin/admin.php";
    }

    public static function postInsert() { /* ... */ }
    public static function postUpdate() { /* ... */ }
    public static function postDelete() { /* ... */ }


    /**
     * Loads the login process based on the request method.
     *
     * If the request method is POST, it processes the login attempt.
     * Otherwise, it loads the login view.
     *
     * @return void
     */
    public static function loadLogin()
    {
        if (strtoupper($_SERVER["REQUEST_METHOD"]) === "POST") {
            self::postLogin();
        }
        else {
            self::getLogin();
        }
    }

    /**
     * Loads the admin login view.
     */
    private static function getLogin() {
        require_once __DIR__ . "/../view/admin/login.php";
    }

    private static function postLogin() { /* ... */ }


    /**
     * Handle a GET request to retrieve the metadata of a table
     *
     * This method verifies that the request method is GET and that the
     * 'id' parameter is set and a valid integer. It then uses the
     * 'id' parameter to retrieve the metadata of the specified table
     * from the database, and returns the metadata as a JSON response.
     *
     * If any of the verifications fail, the method returns an appropriate
     * HTTP status code and an error message.
     */
    public static function getTable() {
        // TODO: Change the request method to POST or start to require a token from the user
        
        // Ensure the request method is GET
        if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
            http_response_code(405);
            echo 'Method Not Allowed';
            exit;
        }

        // Validate admin identity
        // if (!Authentication::validateAdmin()) {
        //     http_response_code(401);
        //     echo 'Unauthorized';
        //     exit;
        // }

        // Verify and sanitize the 'id' parameter
        if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
            http_response_code(400);
            echo 'Bad Request';
            exit;
        }

        $tableIndex = (int)$_GET['id'];

        // error_log("Table index: $tableIndex");

        // Retrieve the table names
        $tableNames = Connection::getTables();
        // error_log("Table names: " . json_encode($tableNames));
        if (!isset($tableNames[$tableIndex])) {
            http_response_code(404);
            echo 'Table Not Found';
            exit;
        }

        $tableName = $tableNames[$tableIndex];

        // error_log("Table name: $tableName");

        try {
            // Fetch metadata for the specified table
            $tableMetadata = Connection::getTableMetadata($tableName);
            $tableMetadata['tableName'] = $tableName;

            // Return the metadata as a JSON response
            header('Content-Type: application/json');
            echo json_encode($tableMetadata);
        } catch (\PDOException $e) {
            error_log("PDOException: " . $e->getMessage());
            http_response_code(500);
            echo 'Internal Server Error';
        }
    }
}

?>

