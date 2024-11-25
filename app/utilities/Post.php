<?php
namespace utilities;

class Post {
    public static function objectToArray($d) 
    {
        if (is_object($d)) {
            // Gets the properties of the given object
            // with get_object_vars function
            $d = get_object_vars($d);
        }

        if (is_array($d)) {
            /*
            * Return array converted to object
            * Using __FUNCTION__ (Magic constant)
            * for recursive call
            */
            return array_map(__FUNCTION__, $d);
        } else {
            // Return array
            return $d;
        }
    }

    public static function getPostData() {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);
        $data = self::objectToArray($data);

        return $data;
    }
}

?>
