<?php

require_once '../Models/DbConnect.php';

class User
{
    private $id;
    private $name;
    private $lastName;
    private $email;
    private $password;
    private $dateRegister;
    private $isActive;
    private $code;
    private $codeExp;

    // Getters and Setters
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    // Make sure that is a valid email and sanatize
    public function setEmail($email)
    {
        $sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
        $this->email = $sanitizedEmail;
    }

    public function getEmail()
    {
        return $this->email;
    }

    // Hash the email before set
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setDateRegister($dateRegister)
    {
        $this->dateRegister = $dateRegister;
    }

    public function getDateRegister()
    {
        return $this->dateRegister;
    }

    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;
    }

    public function getIsActive()
    {
        return $this->isActive;
    }

    public function setCode($code)
    {
        $this->code = $code;
    }

    public function getCode()
    {
        return $this->code;
    }

    // Generate new Datetime Expiration for code
    public function setCodeExp()
    {
        $currentDateTime = new DateTime();
        $currentDateTime->add(new DateInterval('PT10M'));
        $this->codeExp = $currentDateTime->format('Y-m-d H:i:s');
    }

    public function getCodeExp()
    {
        return $this->codeExp;
    }

    /**
     * Saves user data to the database.
     *
     * This method inserts user data into the 'users' table in the database.
     * And Hashs the password
     *
     * @return bool True if the insertion is successful, false otherwise.
     */
    public function saveUser()
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to insert user data
            $query = "INSERT INTO users (name, lastName, email, password, dateRegister, code, codeExp) 
        VALUES (:name, :lastName, :email, :password, :dateRegister, :code, :codeExp)";

            $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':name', $this->name);
            $stmt->bindParam(':lastName', $this->lastName);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':dateRegister', $this->dateRegister);
            $stmt->bindParam(':code', $this->code);
            $stmt->bindParam(':codeExp', $this->codeExp);

            // Execute the SQL statement
            $stmt->execute();

            // Return true if insertion is successful
            return true;
        } catch (PDOException $e) {
            // If there is a PDO exception, capture and display the error message
            echo "Error saving user: " . $e->getMessage();

            // Return false on error
            return false;
        }
    }

    /**
     * Retrieves user data from the database by email.
     *
     * This method queries the database for a user with the specified email address.
     *
     * @param string $email The email address of the user to retrieve.
     * @return mixed An associative array representing the user if found, or false if not found or an error occurs.
     */
    public static function getUserByEmail($email)
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to select user data by email
            $query = "SELECT * FROM users WHERE email = :email";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':email', $email);

            // Execute the SQL statement
            $stmt->execute();

            // Fetch the user data
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            // Return false if user not found
            if (!$userData) {
                return false;
            }

            // Create a new User object and pass the user data to its constructor
            $user = new User();
            $user->setId($userData['id']);
            $user->setName($userData['name']);
            $user->setLastName($userData['lastName']);
            $user->setEmail($userData['email']);
            $user->setPassword($userData['password']);
            $user->setDateRegister($userData['dateRegister']);
            $user->setIsActive($userData['isActive']);
            $user->setCode($userData['code']);
            $user->setCodeExp($userData['codeExp']);

            // Return the User object
            return $user;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error fetching user by email: " . $e->getMessage();

            // Return false on error
            return false;
        }
    }

    /**
     * Retrieves user data from the database by ID.
     *
     * This method queries the database for a user with the specified ID.
     *
     * @param int $id The ID of the user to retrieve.
     * @return mixed An associative array representing the user if found, or false if not found or an error occurs.
     */
    public static function getUserById($id)
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to select user data by ID
            $query = "SELECT * FROM users WHERE id = :id";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':id', $id);

            // Execute the SQL statement
            $stmt->execute();

            // Fetch the user data
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            // Return false if user not found
            if (!$userData) {
                return false;
            }

            // Create a new User object and pass the user data to its constructor
            $user = new User();
            $user->setId($userData['id']);
            $user->setName($userData['name']);
            $user->setLastName($userData['lastName']);
            $user->setEmail($userData['email']);
            $user->setPassword($userData['password']);
            $user->setDateRegister($userData['dateRegister']);
            $user->setIsActive($userData['isActive']);
            $user->setCode($userData['code']);
            $user->setCodeExp($userData['codeExp']);

            // Return the User object
            return $user;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error fetching user by id: " . $e->getMessage();

            // Return false on error
            return false;
        }
    }

    /**
     * Activates the user account in the database.
     *
     * This method updates the 'isActive' column in the 'users' table to 1 (true) for the user with the specified ID,
     * indicating that the user's account is now active.
     *
     * @return bool True if the activation is successful, false otherwise.
     */
    public function activateUser()
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to update user's 'isActive' status to 1 (true)
            $query = "UPDATE users SET isActive = 1 WHERE id = :id";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':id', $this->id);

            // Execute the SQL statement
            $stmt->execute();

            // Return true if activation is successful
            return true;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error activating user: " . $e->getMessage();
            // Return false on error
            return false;
        }
    }

    /**
     * Deletes the user from the database.
     *
     * This method removes the user's record from the 'users' table based on the user's ID.
     *
     * @return bool True if the deletion is successful, false otherwise.
     */
    public function deleteUser()
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to delete user by ID
            $query = "DELETE FROM users WHERE id = :id";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':id', $this->id);

            // Execute the SQL statement
            $stmt->execute();

            // Return true if deletion is successful
            return true;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error deleting user: " . $e->getMessage();
            // Return false on error
            return false;
        }
    }

    /**
     * Checks if the provided password matches the user's stored password hash.
     *
     * This method verifies whether the provided password matches the hashed password stored in the user's record.
     *
     * @param string $password The password to check.
     * @return bool True if the password is correct, false otherwise.
     */
    public function checkPassword($password)
    {
        // Compare the provided password with the stored hashed password
        return password_verify($password, $this->password);
    }

    /**
     * Updates the user's password in the database.
     *
     * This method updates the user's password with a new hashed password in the 'users' table based on the user's ID.
     *
     * @param string $newPassword The new password to set for the user.
     * @return bool True if the password update is successful, false otherwise.
     */
    public function updatePassword($newPassword)
    {
        try {
            // Hash the new password
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Get a connection to the database
            $connection = Connect::getInstance();

            // SQL query to update user's password by ID
            $query = "UPDATE users SET password = :password WHERE id = :id";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':id', $this->id);

            // Execute the SQL statement
            $stmt->execute();

            // Return true if update is successful
            return true;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error updating password: " . $e->getMessage();
            // Return false on error
            return false;
        }
    }

    /**
     * Updates the user's verification code and expiration date in the database.
     *
     * This method sets a new verification code and expiration date for the user,
     * then updates the corresponding fields in the 'users' table based on the user's ID.
     *
     * @param int $code The new verification code to set for the user.
     * @return bool True if the update is successful, false otherwise.
     */
    public function updateCode($code)
    {
        try {
            // Get a connection to the database
            $connection = Connect::getInstance();

            // Set the new code expiration using the setCodeExp() method
            $this->setCodeExp();

            // Retrieve the current code expiration from the object
            $codeExp = $this->codeExp;

            // SQL query to update user's code and expiration date by ID
            $query = "UPDATE users SET code = :code, codeExp = :codeExp WHERE id = :id";

            // Prepare the SQL statement
            $stmt = $connection->prepare($query);

            // Bind parameters to the SQL statement
            $stmt->bindParam(':code', $code);
            $stmt->bindParam(':codeExp', $codeExp);
            $stmt->bindParam(':id', $this->id);

            // Execute the SQL statement
            $stmt->execute();

            // Return true if the update is successful
            return true;
        } catch (PDOException $e) {
            // If an error occurs, output the error message
            echo "Error updating code and expiration date: " . $e->getMessage();
            // Return false on error
            return false;
        }
    }

    /**
     * Checks if the provided verification code matches the user's code and is still valid.
     *
     * This method compares the provided verification code with the user's stored code,
     * and also checks if the code expiration date has not passed.
     *
     * @param int $code The verification code to check.
     * @return bool True if the code is valid and not expired, false otherwise.
     */
    public function checkCode($code)
    {
        // Get the current datetime as a string
        $currentDateTime = new DateTime();
        $currentDateTimeStr = $currentDateTime->format('Y-m-d H:i:s');

        // Check if the current datetime is before the expiration date
        if ($currentDateTimeStr >= $this->codeExp) {
            return false;
        }

        // Check if the provided code matches the user's code
        if ($this->code != $code) {
            return false;
        }

        // If both checks pass, the code is valid
        return true;
    }
}
