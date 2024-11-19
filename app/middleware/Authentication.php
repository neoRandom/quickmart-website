<?php
require_once __DIR__ . "/../autoload.php";

class Authentication 
{
    public static function validateClient() {
        session_start();

        if (!isset($_SESSION["client_token"])) {
            header("HTTP/1.1 401 Unauthorized");
            self::redirectLogin("login");  // quickmart/public/login
        }

        if (!self::verifyClientToken($_SESSION["client_token"])) {
            header("HTTP/1.1 403 Forbidden");
            self::redirectLogin("login");  // quickmart/public/login
        }
    }

    private static function verifyClientToken(string $token) {
        return false;
    }

    public static function validateAdmin() {
        session_start();

        if (!isset($_SESSION["admin_token"])) {
            header("HTTP/1.1 401 Unauthorized");
            self::redirectLogin("admin/login");  // quickmart/public/admin/login
        }

        if (!self::verifyAdminToken($_SESSION["admin_token"])) {
            header("HTTP/1.1 403 Forbidden");
            self::redirectLogin("admin/login");  // quickmart/public/admin/login
        }

        return true;
    }

    private static function verifyAdminToken(string $token) {
        return false;
    }

    private static function redirectLogin(string $url) {
        header("Location: " . BASE_URL . $url);
        die();
    }
}

?>