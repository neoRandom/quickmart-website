<?php
require_once __DIR__ . "/../autoload.php";

class Authentication 
{
    public ?string $token = null;

    public function __construct() 
    {
        session_start();

        if (!isset($_SESSION["token"])) {
            header("HTTP/1.1 401 Unauthorized");
            $this->redirectLogin();
        }

        if (!$this->verifyToken($_SESSION["token"])) {
            header("HTTP/1.1 403 Forbidden");
            $this->redirectLogin();
        }
    }

    public function verifyToken(string $token): bool {
        /* ... */
        return false;
    }

    public function redirectLogin() {
        header("Location: " . BASE_URL . "login/");
        die();
    }
}

?>