<?php
require_once __DIR__ . "/Controller.php";

class AdminController extends Controller
{
    public function __construct()
    {
        require_once __DIR__ . "/../view/admin/admin.php";
    }
}

?>
