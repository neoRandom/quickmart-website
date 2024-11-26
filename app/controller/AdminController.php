<?php

use utilities\Authentication;
use utilities\Post;
use utilities\Hash;
use database\Connection;
use model\Credenciais;
use utilities\JWT;

require_once __DIR__ . "/../autoload.php";


class AdminController
{
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
     * Handles a request by validating the request method and admin identity.
     *
     * It checks if the request method matches the given $requestMethod and if the admin is authenticated.
     * If the request method is invalid or the admin is not authenticated, it sets the appropriate HTTP status code and returns an error response.
     *
     * It then executes the given $logic function and checks the result.
     * If the result contains a 'status' key, it sets the HTTP status code to that value.
     * If the result contains a 'header' key, it sets the given header.
     * If the result contains a 'body' key, it outputs the given body.
     *
     * If any exceptions are thrown while executing the $logic function, it catches them and returns an error response.
     *
     * @param string $requestMethod The request method to validate. Default is "POST".
     * @param callable $logic The logic function to execute after validation.
     */
    private static function handleRequest(string $requestMethod = "POST", callable $logic): void
    {
        // Check if the request method is $requestMethod
        if (strtoupper($_SERVER['REQUEST_METHOD']) !== strtoupper($requestMethod)) {
            http_response_code(405); // Method Not Allowed
            header('Content-Type: application/json');
            echo json_encode(['error' => "Method Not Allowed. Only $requestMethod requests are allowed."]);
            return;
        }

        // Validate admin identity
        if (!Authentication::validateAdmin()) {
            http_response_code(401);
            header("Location: " . BASE_URL . "admin/login");
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Unauthorized']);
            return;
        }

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

    

    /**
     * Loads the admin login view.
     */
    private static function getLogin() {
        require_once __DIR__ . "/../view/admin/login.php";
    }


    /**
     * Processes the admin login request.
     *
     * This method validates the presence of 'username' and 'password' in the POST request.
     * If credentials are valid, it creates a JWT token and sets it as an admin cookie.
     * If validation fails, it returns an appropriate HTTP status code and error message.
     *
     * - On successful login, redirects to the admin dashboard.
     * - On failure, redirects to the login page with an error response.
     *
     * @return void
     */
    private static function postLogin() {
        if (!isset($_POST['username']) || !isset($_POST['password'])) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Bad Request']);
            return;
        }

        $username = $_POST['username'];
        $password = $_POST['password'];

        // Verificando as credenciais
        $user = new Credenciais($username);
        if (!$user->read())
        {
            setcookie("state", "not-found", time() + 3600);
            header('Location: ' . BASE_URL . 'admin/login');
            exit;
        }

        if ($user->getCodAcesso() !== 1)
        {
            setcookie("state", "unauthorized", time() + 3600);
            header('Location: ' . BASE_URL . 'admin/login');
            exit;
        }

        $result = Hash::verify($password, $user->getHash(), $user->getSalt());

        if ($result) {
            $token = JWT::createJWT(['username' => $user->getUsuario(), 'access' => $user->getCodAcesso()]);

            setcookie("admin_token", $token, [
                'expires' => time() + 60 * 60 * 24 * 7, // Expiration time (in seconds) defined as 7 days
                'path' => '/',  // This path means that the cookie will be sent only to the current domain
                'httponly' => true, // Server-side only
                'samesite' => 'Strict' // CSRF Protection
            ]);

            header('Location: ' . BASE_URL . 'admin');
        }
        else {
            header('Location: ' . BASE_URL . 'admin/login');
            exit;
        }
    }


    public static function logout() {
        setcookie("admin_token", "", time() - 3600, "/", "", false, true);
        header('Location: ' . BASE_URL . 'admin/login');
    }


    /**
     * Loads the admin view.
     *
     * This method is responsible for rendering the admin view. It uses the
     * handleRequest method to validate the request and execute the logic
     * of loading the view. The view is loaded from the admin.php file in the
     * view/admin directory.
     *
     * @return void
     */
    public static function loadAdmin()
    {
        self::handleRequest("GET", function () {
            ob_start();
            require_once __DIR__ . "/../view/admin/admin.php";
            $content = ob_get_clean(); 

            return [
                "status" => 200,
                "header" => "Content-Type: text/html",
                "body" => $content
            ];
        });
    }


    /**
     * Handles the POST request to insert a new record into the database.
     *
     * This method retrieves the data from the POST request, determines the target table
     * based on the provided table index, and attempts to create a new record. If the data
     * cannot be converted into the appropriate format or the record creation fails, it
     * responds with an error. Otherwise, it confirms the successful insertion of the data.
     *
     * @return void
     */
    public static function postInsert() 
    {
        self::handleRequest("POST", function () {
            $data = Post::getData();

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


    /**
     * Handles the POST request to update an existing record in the database.
     *
     * This method retrieves the data from the POST request, determines the target table
     * based on the provided table index, and attempts to update the existing record. If the
     * data cannot be converted into the appropriate format or the record update fails, it
     * responds with an error. Otherwise, it confirms the successful update of the data.
     *
     * @return void
     */
    public static function postUpdate() 
    {
        self::handleRequest("POST", function () {
            $data = Post::getData();

            $tableIndex = (int) $data['id'];
            $tableClass = Connection::getTables()[$tableIndex];
            $register = new $tableClass();

            if (!$register->fromArray($data)) {
                return [
                    "status" => 400,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode(["error" => "Failed to update data."])
                ];
            }

            if (!$register->update()) {
                return [
                    "status" => 400,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode(["error" => "Failed to update data."])
                ];
            }
            return [
                "status" => 200,
                "header" => "Content-Type: application/json",
                "body" => json_encode(["success" => "Data updated successfully."])
            ];
        });
    }


    /**
     * Handles the POST request to delete a record from the database.
     *
     * This method retrieves the data from the POST request, determines the target table
     * based on the provided table index, and attempts to delete the record. If the data
     * cannot be converted into the appropriate format or the record deletion fails, it
     * responds with an error. Otherwise, it confirms the successful deletion of the data.
     *
     * @return void
     */
    public static function postDelete() 
    {
        self::handleRequest("POST", function () {
            $data = Post::getData();

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

            if (!$register->delete()) {
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
    public static function getMetadata() 
    {
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
    public static function getRegisters() 
    {
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

            $key = null;
            if (isset($_GET["key"])) {
                $key = $_GET["key"];
            }

            $value = "";
            if (isset($_GET["value"])) {
                $value = $_GET["value"];
            }

            $limit = 10;
            if (isset($_GET["limit"]) && is_numeric($_GET["limit"])) {
                $limit = (int) $_GET["limit"];
            }

            $offset = 0;
            if (isset($_GET["offset"]) && is_numeric($_GET["offset"])) {
                $offset = (int) $_GET["offset"];
            }

            try {
                $payload = Connection::getTableRowsJSON($tableIndex, $key, $value, $limit, $offset);

                // Return the registers as a JSON response
                return [
                    "status" => 200,
                    "header" => "Content-Type: application/json",
                    "body" => json_encode($payload)
                ];
            } catch (\PDOException $e) {
                error_log("PDOException: " . $e->getMessage());
                return [
                    "status" => 500,
                    "header" => "Content-Type: text/plain",
                    "body" => "Internal Server Error"
                ];
            }
        });
    }
}

?>

