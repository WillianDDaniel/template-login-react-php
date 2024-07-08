<?php

require_once '../Models/User.php';
require_once '../Models/Mailer.php';
require_once '../Models/Token.php';

class UserController
{
    /**
     * Register a new user.
     *
     * @param string $name The user's first name.
     * @param string $lastName The user's last name.
     * @param string $email The user's email address.
     * @param string $password The user's password.
     * 
     * @return array An array indicating the success or failure of the operation and a message.
     */

    public function signUp($name, $lastName, $email, $password)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Check if the password is valid
        if (strlen($password) < 8) {
            return ['success' => false, 'message' => 'Invalid password'];
        }

        // Check if the user already exists
        if (User::getUserByEmail($email)) {
            return ['success' => false, 'message' => 'User already exists.'];
        }

        $code = random_int(100000, 999999);

        $user = new User();
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setPassword($password);
        $user->setDateRegister(date('Y-m-d'));
        $user->setCode($code);

        // This method is a automatic way to generate new code's date exp.
        $user->setCodeExp();

        // Save the new user
        if ($user->saveUser()) {

            // Send confirmation email
            $isEmailSent = Mailer::sendConfirmationEmail($email, $name, $code);

            if ($isEmailSent) {
                return ['success' => true, 'message' => 'Confirmation email is sent'];
            }

            return ['success' => false, 'message' => 'User created successfully, but failed to send confirmation email.'];
        }

        return ['success' => false, 'message' => 'Failed to create user.'];
    }

    /**
     * Sign in a user.
     *
     * @param string $email The user's email address.
     * @param string $password The user's password.
     * 
     * @return array An array indicating the success or failure of the operation and a Token.
     */

    public function signIn($email, $password)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found'];
        }

        // Check if the password is correct
        if (!$user->checkPassword($password)) {
            return ['success' => false, 'message' => 'Incorrect password'];
        }

        // Create a token
        $token = Token::createToken($user->getId(), $user->getEmail());

        // Return success and token
        return ['success' => true, 'token' => $token];
    }

    /**
     * Confirm a user's account.
     *
     * @param string $email The user's email address.
     * @param int $code The confirmation code.
     * 
     * @return array An array indicating the success or failure of the operation.
     */

    public function confirmAccount($email, $code)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found'];
        }

        // Check if code matches
        if (!$user->checkCode($code)) {
            return ['success' => false, 'message' => 'Invalid or expired code'];
        }

        if (!$user->activateUser()) {
            return ['success' => false, 'message' => 'Error on active user'];
        }

        // If the code is ok return true
        return ['success' => true, 'message' => 'Account active'];
    }

    /**
     * Update the confirmation code for a user and resend the confirmation email.
     *
     * @param string $email The user's email address.
     * 
     * @return array An array indicating the success or failure of the operation.
     */

    public function updateCode($email)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found'];
        }

        $code = random_int(100000, 999999);

        // Check if new code and Expiration date is save
        if (!$user->updateCode($code)) {
            return ['success' => false, 'message' => 'Error on update code.'];
        }

        // Resend confirmation email
        $isEmailSent = Mailer::sendConfirmationEmail($email, $user->getName(), $code);

        if (!$isEmailSent) {
            return ['success' => false, 'message' => 'Error on send email, try again later.'];
        }

        return ['success' => true, 'message' => 'Confirmation email is resent'];
    }

    /**
     * Check if a user's confirmation code matches.
     *
     * @param string $email The user's email address.
     * @param int $code The confirmation code.
     * 
     * @return array An array indicating the success or failure of the operation.
     */

    public function checkCode($email, $code)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found'];
        }

        // Check if code matches
        if (!$user->checkCode($code)) {
            return ['success' => false, 'message' => 'Invalid or expired code'];
        }

        return ['success' => true, 'message' => 'Confirmation code successfully'];
    }

    /**
     * Update a user's password.
     *
     * @param string $email The user's email address.
     * @param int $code The confirmation code.
     * @param string $newPassword The new password.
     * 
     * @return array An array indicating the success or failure of the operation.
     */

    public function updatePassword($email, $code, $newPassword)
    {
        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found.'];
        }

        // Check if code matches
        if (!$user->checkCode($code)) {
            return ['success' => false, 'message' => 'Invalid or expired code.'];
        }

        // Check if the password is valid
        if (strlen($newPassword) < 8) {
            return ['success' => false, 'message' => 'Invalid password.'];
        }

        // Check if the password is updated
        if (!$user->updatePassword($newPassword)) {
            return ['success' => false, 'message' => 'Error on update password.'];
        }

        return ['success' => true, 'message' => 'Update password successfully.'];
    }

    public function forgotPass($email) {

        // Check if the email is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email'];
        }

        // Fetch user by email
        $user = User::getUserByEmail($email);

        // Check if the user exists
        if (!$user) {
            return ['success' => false, 'message' => 'User not found.'];
        }

        $code = random_int(100000, 999999);

        // Check if new code and Expiration date is save
        if (!$user->updateCode($code)) {
            return ['success' => false, 'message' => 'Error on update code.'];
        }

        // Resend confirmation email
        $isEmailSent = Mailer::sendConfirmationEmail($email, $user->getName(), $code);

        if (!$isEmailSent) {
            return ['success' => false, 'message' => 'Error on send email, try again later.'];
        }

        return ['success' => true, 'message' => 'Confirmation email is resent'];

    }
}
