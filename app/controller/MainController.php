<?php

use utilities\Authentication;

require_once __DIR__ . "/../autoload.php";

class MainController
{
    public static function loadMain()
    {
        require_once __DIR__ . "/../view/main.php";
    }

    public static function loadUser()
    {
        Authentication::validateClient();

        require_once __DIR__ . "/../view/user_page.php";
    }

    
    public static function loadLogin() {
        if (strtoupper($_SERVER["REQUEST_METHOD"]) === "POST") {
            self::postLogin();
        }
        else {
            self::getLogin();
        }
    }

    private static function getLogin() {
        require_once __DIR__ . "/../view/login.php";
    }

    private static function postLogin() { /* ... */ }
}

?>
