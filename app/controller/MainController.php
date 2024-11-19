<?php
require_once __DIR__ . "/../middleware/Authentication.php";

class MainController
{
    public function __construct()
    {
        new Authentication();

        require_once __DIR__ . "/../view/main.php";
    }
}

?>
