<?php 

namespace utilities;

class Hash {
    public static function verify(string $input, $hash, $salt): bool {
        if (hash('sha256', $input . $salt) === $hash) {
            return true;
        }
        return false;
    }

    public static function generateSalt(): int {
        return mt_rand(0, 4294967295);
    }

    public static function generate(string $input, int $salt): string {
        return hash('sha256', $input . $salt);
    }
}

?>