<?php
require_once __DIR__ . "/../middleware/Authentication.php";

class AdminController
{
    public static function loadAdmin()
    {
        // TODO: Remove this comment before launch
        // Authentication::validateAdmin();

        require_once __DIR__ . "/../view/admin/admin.php";
    }

    private function getDefault() { /* ... */ }

    public static function postInsert() { /* ... */ }
    public static function postUpdate() { /* ... */ }
    public static function postDelete() { /* ... */ }


    public static function loadLogin()
    {
        if (strtoupper($_SERVER["REQUEST_METHOD"]) === "POST") {
            self::postLogin();
        }
        else {
            self::getLogin();
        }
    }

    private static function getLogin() {
        require_once __DIR__ . "/../view/admin/login.php";
    }

    private static function postLogin() { /* ... */ }
}

?>
