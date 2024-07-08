<?php

// Allow requests from the specified origin
header("Access-Control-Allow-Origin: http://localhost:5173");

// Allow only POST requests
header("Access-Control-Allow-Methods: POST");

// Set the default timezone to America/Sao_Paulo
date_default_timezone_set('America/Sao_Paulo');

// Include the UserController.php file to access user-related functionality
include('../Controllers/UserController.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Retrieve data from the request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Extract user data from the received JSON
    $email = $data['email'];
    $code = $data['code'];
    $password = $data['password'];
    
    // Instantiate UserController
    $newUser = new UserController();
    
    // Call the updatePassword method to change password
    $response = $newUser->updatePassword($email, $code, $password);
    
    // Convert the response array to JSON
    $responseJson = json_encode($response);

    // Set the Content-Type header to indicate JSON response
    header("Content-Type: application/json");
    
    // Send the JSON response back to the client
    echo $responseJson;

} else {
    // If the request method is not POST, respond with HTTP status code 401 (Unauthorized)
    http_response_code(401);
}
