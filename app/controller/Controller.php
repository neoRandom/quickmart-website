<?php
require_once __DIR__ . "/../middleware/Authentication.php";

abstract class Controller
{
    protected $auth;

    public function __construct()
    {
        $auth = new Authentication();
    }
}

?>
