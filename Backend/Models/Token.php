<?php 


class Token
{
    // Secret key for token signature
    private static $secretKey = "DSAD45DFS5412DF8748S3D5F";
    
    // Method to create a token based on ID and email
    public static function createToken($id, $email)
    {
        // JWT token header
        $header = array(
            "alg" => "HS256",
            "typ" => "JWT"
        );
        
        // Create a payload with ID, email, and expiration time
        $payload = array(
            "id" => $id,
            "email" => $email,
            "exp" => time() + (60 * 60 * 24 * 7) // Set token expiration time (1 hour)
        );

        // Encode header and payload as JSON
        $encodedHeader = base64_encode(json_encode($header));
        $encodedPayload = base64_encode(json_encode($payload));

        // Sign the header and payload using the secret key
        $signature = hash_hmac('sha256', $encodedHeader . "." . $encodedPayload, self::$secretKey, true);
        $encodedSignature = base64_encode($signature);

        // Concatenate header, payload, and signature to form JWT token
        $token = $encodedHeader . "." . $encodedPayload . "." . $encodedSignature;

        return $token;
    }

    // Method to verify token validity
    public static function verifyToken($token)
    {
        // Split the token into header, payload, and signature
        list(, $encodedPayload, $encodedSignature) = explode('.', $token);

        // Decode token payload
        $payload = json_decode(base64_decode($encodedPayload), true);

        // Check if the token has expired
        if ($payload && isset($payload['exp']) && $payload['exp'] >= time()) {
            // Calculate the expected signature
            $expectedSignature = hash_hmac('sha256', $encodedPayload, self::$secretKey, true);

            // Verify if the signature is valid
            if (hash_equals($encodedSignature, base64_encode($expectedSignature))) {
                return true;
            }
        }

        return false;
    }
}
