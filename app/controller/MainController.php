<?php
require_once __DIR__ . "/Controller.php";

class MainController extends Controller
{
    public function __construct()
    {
        require_once __DIR__ . "/../view/main.php";
    }
}

?>
