<?php

class LoginController
{
    public function __construct()
    {
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $this->postLogin();
        }
        else {
            $this->getLogin();
        }
    }

    private function getLogin() {
        require_once __DIR__ . "/../view/login.php";
    }

    private function postLogin() { /* ... */ }
}

?>
