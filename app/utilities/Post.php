<?php

namespace utilities;

namespace utilities;

class Post {
    public static function objectToArray($d) 
    {
        if (is_object($d)) {
            // Converts the object to an associative array
            $d = get_object_vars($d);
        }

        if (is_array($d)) {
            /*
            * Recursively convert objects within arrays to arrays
            */
            return array_map([self::class, 'objectToArray'], $d);
        } else {
            // Return array
            return $d;
        }
    }

    public static function getData() {
        if (!$_POST) {
            $data = file_get_contents('php://input');
            $data = json_decode($data, true);
            $data = self::objectToArray($data);

            return $data;
        }
        return $_POST;
    }
}


?>
