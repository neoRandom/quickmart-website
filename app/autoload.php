<?php

define("BASE_URL", "http://localhost/quickmart/public/");

spl_autoload_register(
    function(string $className) {
        $filePath = str_replace("\\", DIRECTORY_SEPARATOR, $className);
        $filePath .= ".php";
        if (file_exists($filePath)) {
            require_once $filePath;
        }
    }
);

?>