<?php

require '../../../lib/mail/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class SignUpController {
    public function sendEmailOtp($email) {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sgulaptop@gmail.com';
            $mail->Password = 'tzhlbzwmmjpgubkh';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('sgulaptop@gmail.com', 'SGU Laptop');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = '=?UTF-8?B?' . base64_encode('Mã xác minh email') . '?=';
            $mail->CharSet = 'UTF-8';
            $otp = rand(100000, 999999);
            $mail->Body = 'Đây là mã xác minh đăng ký tài khoản của bạn: ' . $otp;

            $mail->send();
            echo $otp;
        } catch (Exception $e) {
            echo "Error: {$mail->ErrorInfo}";
        }
    }
}

$signupCtl = new SignUpController();
$action = $_REQUEST['action'];

switch ($action) {
    case 'send-otp':
        $email = $_POST['email'];
        $signupCtl->sendEmailOtp($email);
        break;
    default:
        break;
}