<?php

require '../../../lib/mail/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class FeedBackController {
    public function sendFeedback($email, $name, $phone, $feedback) {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'sgulaptopfeedback@gmail.com';
            $mail->Password = 'evvfydxijbfqgzrh';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('sgulaptopfeedback@gmail.com', 'SGU Laptop Feedback');
            $mail->addAddress('sgulaptop@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = '=?UTF-8?B?' . base64_encode('Phản hồi từ người dùng' . $email . '-' . $name . '-' . $phone) . '?=';
            $mail->CharSet = 'UTF-8';
            $mail->Body = 'Nội dung phản hồi: ' . $feedback;

            $mail->send();
            echo 'success';
        } catch (Exception $e) {
            echo "Error: {$mail->ErrorInfo}";
        }
    }
}

$feedbackCtl = new FeedBackController();
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

switch ($action) {
    case 'send-feedback':
        $email = $_POST['email'];
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $feedback = $_POST['feedback'];
        $feedbackCtl->sendFeedback($email, $name, $phone, $feedback);
        break;
    default:
        break;
}