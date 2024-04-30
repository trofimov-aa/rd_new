<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['name'];
$tel = $data['tel'];
$email = $data['email'];
$msg = $data['msg'];

// Контент письма
$title = 'Заявка с сайта'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Телефон: <strong>'.$tel.'</strong></p>'.
        '<p>Почта: <strong>'.$email.'</strong></p>'.
        '<p>Сообщение: <strong>'.$msg.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username   = 'нужна новая почта @yandex.ru'; // Логин на почте
  $mail->Password   = ' пароли приложений'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('наша новая почта @yandex.ru', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('info@rd36.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение отправлено успешно!');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено! Причина ошибки: {$mail->ErrorInfo}');
}
