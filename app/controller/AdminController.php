<?php
require_once __DIR__ . "/../middleware/Authentication.php";

class AdminController
{
    public function __construct()
    {
        new Authentication();

        require_once __DIR__ . "/../view/admin/admin.php";
    }

    private function getDefault() { /* ... */ }

    public static function postInsert() { /* ... */ }
    public static function postUpdate() { /* ... */ }
    public static function postDelete() { /* ... */ }
}

?>
