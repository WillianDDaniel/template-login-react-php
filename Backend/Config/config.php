<?php

require '../vendor/autoload.php';

use Dotenv\Dotenv;

// Path to the .env file
$dotenv = Dotenv::createImmutable(__DIR__);

// Load environment variables
$dotenv->load();

// PhpMailer configurations
$smtpHost = $_ENV['SMTP_HOST'];
$smtpUsername = $_ENV['SMTP_USERNAME'];
$smtpPassword = $_ENV['SMTP_PASSWORD'];
$smtpFromEmail = $_ENV['SMTP_FROM_EMAIL'];
$smtpFromName = $_ENV['SMTP_FROM_NAME'];

// Database configurations
$dbHost = $_ENV['DB_HOST'];
$dbName = $_ENV['DB_NAME'];
$dbUser = $_ENV['DB_USER'];
$dbPassword = $_ENV['DB_PASSWORD'];
