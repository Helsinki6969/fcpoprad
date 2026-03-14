<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Ak je to OPTIONS požiadavka (preflight), ukončíme ju úspešne
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Čítanie JSON dát zo vstupu
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Neplatné dáta"]);
    exit;
}

$name = strip_tags($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$subject = strip_tags($data['subject']);
$message = strip_tags($data['message']);

// Adresa, na ktorú má prísť mail (tvoj admin mail)
$to = "turlik.adrian167@gmail.com"; 

$email_subject = "Kontaktný formulár: " . $subject;
$email_body = "Dostali ste novú správu z webu FC Poprad - Stráže:\n\n";
$email_body .= "Od: $name ($email)\n";
$email_body .= "Predmet: $subject\n\n";
$email_body .= "Správa:\n$message\n\n";
$email_body .= "-----------------------------------\n";
$email_body .= "Táto správa bola tiež uložená v Supabase databáze.";

// Nastavenie hlavičiek pre lepšiu doručiteľnosť
$headers = "From: info@fcpoprad.info\r\n";
// Ak hosting blokuje 'info@fcpoprad.info', skús tu dať alternatívne turlik.adrian167@gmail.com
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(["success" => true, "message" => "Mail bol odoslaný"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Nepodarilo sa odoslať mail cez PHP server. Skontrolujte nastavenia mail() funkcie na hostingu."]);
}
?>
