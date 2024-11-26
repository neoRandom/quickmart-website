<?php

define("BASE_URL", "http://localhost/quickmart/public/");

spl_autoload_register(
    function (string $className) {
        $filePath = __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
        if (file_exists($filePath)) {
            require_once $filePath;
        }
    }
);

?>