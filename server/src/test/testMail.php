<?php

use PHPMailer\PHPMailer\PHPMailer;

$msg = '';

if (array_key_exists('email', $_POST)) {
   date_default_timezone_set('Etc/UTC');

   require '../../lib/mail/vendor/autoload.php';

   $mail = new PHPMailer();

   $mail->isSMTP();
   $mail->Host = 'smtp.gmail.com';
   $mail->Port = 465;

   $mail->setFrom('customer@gmail.com', 'Customer');

   $addresses = [
      'sales' => 'sgulaptop@gmail.com',
      'support' => 'sgulaptop@gmail.com',
      'accounts' => 'sgulaptop@gmail.com',
   ];

   if (array_key_exists('dept', $_POST) && array_key_exists($_POST['dept'], $addresses)) {
      $mail->addAddress($addresses[$_POST['dept']]);
   } else {
      $mail->addAddress('sgulaptop@gmail.com');
   }

   if ($mail->addReplyTo($_POST['email'], $_POST['name'])) {
      $mail->isHTML(true);
      
      $mail->Subject = 'From ' . $_POST['email'];
      $mail->Body = $_POST['message'];

      if (!$mail->send()) {
         $msg = 'Sorry, something went wrong. Please try again later. <br>';
         $msg .= $mail->ErrorInfo;
      } else {
         $msg = 'Message sent! Thanks for contacting us.';
      }
   } else {
      $msg = 'Invalid email address, message ignored.';
   }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <title>Contact form</title>
</head>

<body>
   <h1>Contact us</h1>
   <?php if (!empty($msg)) {
      echo "<h2>$msg</h2>";
   } ?>
   <form method="POST">
      <label for="name">Name: <input type="text" name="name" id="name"></label><br>
      <label for="email">Email address: <input type="email" name="email" id="email"></label><br>
      <label for="message">Message: <textarea name="message" id="message" rows="8" cols="20"></textarea></label><br>
      <label for="dept">Send query to department:</label>
      <select name="dept" id="dept">
         <option value="sales">Sales</option>
         <option value="support" selected>Technical support</option>
         <option value="accounts">Accounts</option>
      </select><br>
      <input type="submit" value="Send">
   </form>
</body>

</html>