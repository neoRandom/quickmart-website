<?php

define("BASE_URL", "http://localhost/quickmart/public/");

spl_autoload_register(
    function (string $className) {
        $filePath = __DIR__ . '/' . str_replace('\\', '/', $className) . '.php';
        error_log("Attempting to autoload: $className from $filePath");
        if (file_exists($filePath)) {
            require_once $filePath;
        }
    }
);

?>