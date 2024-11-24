<?php
use database\Connection;

require_once __DIR__ . "/../autoload.php";

// Util (move to another file later)
function objectToArray($d) 
{
    if (is_object($d)) {
        // Gets the properties of the given object
        // with get_object_vars function
        $d = get_object_vars($d);
    }

    if (is_array($d)) {
        /*
        * Return array converted to object
        * Using __FUNCTION__ (Magic constant)
        * for recursive call
        */
        return array_map(__FUNCTION__, $d);
    } else {
        // Return array
        return $d;
    }
}

function getPostData() {
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    $data = objectToArray($data);

    return $data;
}


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

    private static function handleRequest(string $requestMethod = "POST", callable $logic): void
    {
        // Check if the request method is $requestMethod
        if ($_SERVER['REQUEST_METHOD'] !== $requestMethod) {
            http_response_code(405); // Method Not Allowed
            header('Content-Type: application/json');
            echo json_encode(['error' => "Method Not Allowed. Only $requestMethod requests are allowed."]);
            return;
        }

        // Validate admin identity
        // if (!Authentication::validateAdmin()) {
        //     http_response_code(401);
        //     echo 'Unauthorized';
        //     exit;
        // }

        // Execute the logic function
        try {
            $response = $logic();

            // Check the result of the logic
            if (isset($response['status'])) {
                http_response_code($response['status']);
            }
            if (isset($response['header'])) {
                header($response['header']);
            }
            if (isset($response['body'])) {
                echo $response['body'];
            }
        } catch (Exception $e) {
            // Catch any exceptions and return an error response
            http_response_code(500); // Internal Server Error
            header('Content-Type: application/json');
            echo json_encode(['error' => 'An unexpected error occurred.', 'details' => $e->getMessage()]);
        }
    }

    public static function postInsert() {
        self::handleRequest("POST", function () {
            $data = getPostData();

            $tableIndex = (int) $data['id'];
            $tableClass = Connection::getTables()[$tableIndex];
            $register = new $tableClass();

            if (!$register->fromArray($data)) {
                return [
                    "status" => 400,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode(["error" => "Failed to insert data."])
                ];
            }

            if (!$register->create()) {
                return [
                    "status" => 400,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode(["error" => "Failed to insert data."])
                ];
            }
            return [
                "status" => 200,
                "header" => "Content-Type: application/json",
                "body" => json_encode(["success" => "Data inserted successfully."])
            ];
        });
    }

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
     * Handle a GET request to retrieve the data and metadata of a table
     *
     * This method verifies that the request method is GET and that the
     * 'id' parameter is set and a valid integer. It then uses the
     * 'id' parameter to retrieve the metadata of the specified table
     * from the database, and returns the metadata as a JSON response.
     *
     * If any of the verifications fail, the method returns an appropriate
     * HTTP status code and an error message.
     */
    public static function getMetadata() {
        self::handleRequest("GET", function () {
            // Verify and sanitize the 'id' parameter
            if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
                return [
                    "status" => 400,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode(["error" => "Bad Request"])
                ];
            }

            $tableIndex = (int) $_GET['id'];

            // error_log("Table index: $tableIndex");

            // Retrieve the table names
            $tableNames = Connection::getTables();
            // error_log("Table names: " . json_encode($tableNames));
            if (!isset($tableNames[$tableIndex])) {
                return [
                    "status" => 404,
                    "header" => "Content-Type: text/plain",
                    "body" => "Table Not Found"
                ];
            }

            $tableName = $tableNames[$tableIndex]::TABLE_NAME;

            // error_log("Table name: $tableName");

            try {
                $payload = [];

                // Fetch metadata for the specified table
                $payload['name'] = $tableName;
                $payload['rows'] = Connection::getTableMetadata($tableName);

                // Return the metadata as a JSON response
                return [
                    "status" => 200,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode($payload)
                ];
            } catch (\PDOException $e) {
                // error_log("PDOException: " . $e->getMessage());
                return [
                    "status" => 500,
                    "header" => "Content-Type: text/plain",
                    "body" => "Internal Server Error"
                ];
            }
        });
    }

    /**
     * Retrieves and returns the table rows as a JSON response based on the provided table index.
     *
     * Ensures the request method is GET, validates the presence and numeric nature of the 'id' parameter.
     * If validation fails, an appropriate HTTP response code and message are returned.
     * In case of a database error during retrieval, logs the error and returns a 500 Internal Server Error.
     *
     * @return void
     */
    public static function getRegisters() {
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

        $tableIndex = (int) $_GET['id'];

        try {
            $payload = Connection::getTableRowsJSON($tableIndex);

            // Return the registers as a JSON response
            header('Content-Type: application/json');
            echo json_encode($payload);
        } catch (\PDOException $e) {
            error_log("PDOException: " . $e->getMessage());
            http_response_code(500);
            echo 'Internal Server Error';
        }
    }
}

?>

