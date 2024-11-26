<?php

namespace utilities;

require_once __DIR__ . "/../autoload.php";

class Authentication 
{
    /**
     * Validates the client session by checking the presence and validity of a client token.
     *
     * This method starts the session, checks if the client token is set, and if it is valid.
     * If the token is not set or is not valid, it redirects the user to the login page.
     *
     * @return void
     */
    public static function validateClient() {
        session_start();

        // Check if the client token is set
        if (!isset($_SESSION["client_token"])) {
            header("HTTP/1.1 401 Unauthorized");
            self::redirectLogin("login");  // quickmart/public/login
        }

        // Check if the client token is valid
        if (!self::verifyClientToken($_SESSION["client_token"])) {
            header("HTTP/1.1 403 Forbidden");
            self::redirectLogin("login");  // quickmart/public/login
        }
    }

    private static function verifyClientToken(string $token) {
        return false;
    }

    /**
     * Validates the admin session by checking the presence and validity of an admin token.
     *
     * @return bool True if the admin is validated; otherwise, false.
     */
    public static function validateAdmin() {
        // Start the session if it isn't already started
        session_start();

        // Check if the admin token is set in the session
        if (!isset($_COOKIE["admin_token"])) {
            return false; // Token is not set, validation fails
        }

        // Verify the admin token
        try {
            JWT::verifyJWT($_COOKIE["admin_token"]);
        } catch (\Exception) {
            return false; // Token verification failed, validation fails
        }

        // Admin is validated
        return true;
    }

    /**
     * Redirects the user to a specified login page.
     *
     * @param string $url The relative URL to redirect to.
     */
    public static function redirectLogin(string $url) {
        // Send a location header to redirect the user
        header("Location: " . BASE_URL . $url);
        
        // Terminate the script to ensure no further code is executed
        die();
    }
}

?>