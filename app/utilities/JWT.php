<?php

namespace utilities;

class JWT {
    /**
     * Creates a JSON Web Token (JWT) with the specified payload, secret, and algorithm.
     *
     * @param array $payload The payload data to include in the JWT.
     * @param string $secret The secret key used to sign the JWT.
     * @param string $algorithm The algorithm to use for signing. Default is 'HS256'.
     * @return string The generated JWT.
     * @throws \Exception If the specified algorithm is not supported.
     */
    public static function createJWT(array $payload, string $secret, string $algorithm = 'HS256'): string {
        // Supported algorithms for signing
        $supportedAlgorithms = ['HS256' => 'sha256'];

        // Ensure the specified algorithm is supported
        if (!isset($supportedAlgorithms[$algorithm])) {
            throw new \Exception("Algoritmo não suportado: $algorithm");
        }

        // HEADER: Define the algorithm and token type
        $header = [
            'alg' => $algorithm,
            'typ' => 'JWT'
        ];
        // Encode the header to a base64 URL-safe string
        $headerEncoded = self::base64UrlEncode(json_encode($header));

        // PAYLOAD: Add issued at (iat) and expiration (exp) time
        $payload['iat'] = time(); // Issued at time
        if (!isset($payload['exp'])) {
            $payload['exp'] = time() + 3600; // Default expiration time is 1 hour
        }
        // Encode the payload to a base64 URL-safe string
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));

        // SIGNATURE: Create a signature using the header and payload
        $data = "$headerEncoded.$payloadEncoded";
        $signature = hash_hmac($supportedAlgorithms[$algorithm], $data, $secret, true);
        // Encode the signature to a base64 URL-safe string
        $signatureEncoded = self::base64UrlEncode($signature);

        // Return the complete JWT as a string
        return "$headerEncoded.$payloadEncoded.$signatureEncoded";
    }
    

    /**
     * Helper function to encode data in base64 URL-safe format.
     *
     * The base64 encoding is modified to use - and _ instead of + and /,
     * and = is removed from the end of the string. This is according to
     * the JSON Web Token specification.
     *
     * @param string $data The data to encode.
     * @return string The base64 URL-safe encoded data.
     */
    private static function base64UrlEncode(string $data): string {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    
    /**
     * Verify the given JWT.
     *
     * @param string $jwt The JWT to verify.
     * @param string $secret The secret key to use for verification.
     * @param string $algorithm The algorithm to use for verification. Default is 'HS256'.
     * @return array The payload of the JWT if verification is successful.
     * @throws \Exception If the JWT is invalid or verification fails.
     */
    public static function verifyJWT(string $jwt, string $secret, string $algorithm = 'HS256'): array {
        // Supported algorithms
        $supportedAlgorithms = ['HS256' => 'sha256'];
    
        // Check if the algorithm is supported
        if (!isset($supportedAlgorithms[$algorithm])) {
            throw new \Exception("Algoritmo não suportado: $algorithm");
        }
    
        // Split the JWT into three parts: header, payload and signature
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            throw new \Exception("Token JWT inválido. Formato incorreto.");
        }
    
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = $parts;
    
        // Decode the header and payload
        $header = json_decode(self::base64UrlDecode($headerEncoded), true);
        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
    
        // Check if the header and payload are valid JSON
        if (!$header || !$payload) {
            throw new \Exception("Header ou payload não são JSON válidos.");
        }
    
        // Check if the algorithm in the header matches the expected algorithm
        if (!isset($header['alg']) || $header['alg'] !== $algorithm) {
            throw new \Exception("Algoritmo no header não corresponde ao esperado ($algorithm).");
        }
    
        // Recalculate the signature and compare it
        $data = "$headerEncoded.$payloadEncoded";
        $calculatedSignature = self::base64UrlEncode(hash_hmac($supportedAlgorithms[$algorithm], $data, $secret, true));
    
        // Use hash_equals to prevent timing attacks
        if (!hash_equals($calculatedSignature, $signatureEncoded)) {
            throw new \Exception("Assinatura inválida.");
        }
    
        // Check the time fields (iat and exp)
        $currentTime = time();
        if (isset($payload['iat']) && $payload['iat'] > $currentTime) {
            throw new \Exception("O token ainda não é válido (iat no futuro).");
        }
    
        if (isset($payload['exp']) && $payload['exp'] < $currentTime) {
            throw new \Exception("O token expirou.");
        }
    
        // Return the payload if everything is valid
        return $payload;
    }
    

    /**
     * Helper function to decode data from base64 URL-safe format.
     *
     * This function converts the URL-safe base64 encoded string back
     * to its original form by replacing the URL-safe characters with
     * standard base64 characters and adding necessary padding.
     *
     * @param string $data The base64 URL-safe encoded data to decode.
     * @return string The decoded data in its original form.
     */
    private static function base64UrlDecode(string $data): string {
        // Calculate the padding needed to make the length a multiple of 4
        $padding = 4 - (strlen($data) % 4);
        
        // Add padding if necessary
        if ($padding !== 4) {
            $data .= str_repeat('=', $padding);
        }
        
        // Replace URL-safe characters with standard base64 characters and decode
        return base64_decode(strtr($data, '-_', '+/'));
    }
}

?>
