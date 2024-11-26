<?php 

namespace utilities;

class Hash {
    public static function verify(string $input, $hash, $salt) {
        if (hash('sha256', $input . $salt) === $hash) {
            return true;
        }
        return false;
    }
}

?>