<?php

class Connect {
    private static $instance = null;

    private function __construct() {
        //
    }

    public static function getInstance() {
        if (!isset(self::$instance)) {

            require '../Config/config.php';

            $dsn = "mysql:host={$dbHost};dbname={$dbName}";
            $dbUser = $dbUser;
            $dbPassword = $dbPassword;

            self::$instance = new PDO($dsn, $dbUser, $dbPassword);
            self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return self::$instance;
    }
}
