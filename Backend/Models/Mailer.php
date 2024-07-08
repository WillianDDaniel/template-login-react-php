<?php

require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer
{
    /**
     * Send an email using PHPMailer.
     *
     * @param string $recipientEmail The recipient's email address.
     * @param string $recipientName The recipient's name.
     * @param string $subject The email subject.
     * @param string $message The email message.
     *
     * @return bool True if the email was sent successfully, otherwise false.
     */

    public static function sendEmail($recipientEmail, $recipientName, $subject, $emailBody)
    {
        require '../Config/config.php'; // Load configuration

        $mailer = new PHPMailer(true); // Create a new PHPMailer instance

        try {
            // Server settings
            $mailer->SMTPDebug = SMTP::DEBUG_OFF; // Disable debugging
            $mailer->isSMTP(); // Set mailer to use SMTP
            $mailer->Host = $smtpHost; // Set the SMTP server to send through
            $mailer->SMTPAuth = true; // Enable SMTP authentication
            $mailer->Username = $smtpUsername; // SMTP username
            $mailer->Password = $smtpPassword; // SMTP password
            $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
            $mailer->Port = 465; // TCP port to connect to

            // Set sender email address and name
            $mailer->setFrom($smtpFromEmail, $smtpFromName);

            // Add recipient email address and name
            $mailer->addAddress($recipientEmail, $recipientName);

            // Set email subject
            $mailer->Subject = $subject;

            // Set email body
            $mailer->Body = $emailBody;

            // Set email format to HTML
            // Set email body
            $mailer->isHTML(true); // Set email format to HTML
            $mailer->CharSet = 'UTF-8'; // Set character encoding
            $mailer->Encoding = 'base64'; // Set encoding for message

            // Send email
            if ($mailer->send()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mailer->ErrorInfo}";
            return false;
        }
    }

    /**
     * Send a confirmation email with a code.
     *
     * @param string $email The recipient's email address.
     * @param string $name The recipient's name.
     * @param int $code The confirmation code.
     *
     * @return bool True if the email was sent successfully, otherwise false.
     */

    public static function sendConfirmationEmail($email, $name, $code)
    {

        require_once '../Utils/buildEmailBody/emailBuild.php';

        $subject = 'Código de confirmação e ativação de conta.';
        $title = 'Código para ativação de conta';
        $message = 'Este código foi enviado para você ativar sua conta em nosso site.';
        $siteName = 'PoupeMais';

        $emailBody = createEmailBody($title, $message, $code, $siteName);

        $isEmailSent = self::sendEmail($email, $name, $subject, $emailBody);

        return $isEmailSent;
    }
}
