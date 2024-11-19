<?php

class AdminController
{
    public function __construct()
    {
        new Authentication();

        require_once __DIR__ . "/../view/admin/admin.php";
    }

    public static function postInsert() { /* ... */ }
    public static function postUpdate() { /* ... */ }
    public static function postDelete() { /* ... */ }
}

?>
