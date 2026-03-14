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

$to = "turlik.adrian167@gmail.com"; 

$email_subject = "Kontaktný formulár: " . $subject;
$email_html = "
    <h2>Dostali ste novú správu z webu FC Poprad - Stráže</h2>
    <p><strong>Od:</strong> {$name} ({$email})</p>
    <p><strong>Predmet:</strong> {$subject}</p>
    <p><strong>Správa:</strong><br>{$message}</p>
    <hr>
    <p><small>Táto správa bola tiež uložená v Supabase databáze.</small></p>
";

// Resend API integrácia
$api_key = 're_b9XkGpLK_34MUdkBszbkRc4s57Zf4s1q6';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => 'FC Poprad <onboarding@resend.dev>', // Resend vyžaduje overenú doménu, zatiaľ použijeme ich testovaciu
    'to' => [$to],
    'reply_to' => $email,
    'subject' => $email_subject,
    'html' => $email_html
]));

$headers = array();
$headers[] = 'Authorization: Bearer ' . $api_key;
$headers[] = 'Content-Type: application/json';
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "Chyba API: " . curl_error($ch)]);
} else {
    if ($http_code >= 200 && $http_code < 300) {
        echo json_encode(["success" => true, "message" => "Mail bol odoslaný cez Resend"]);
    } else {
        http_response_code($http_code);
        echo json_encode(["error" => "Nepodarilo sa odoslať mail cez Resend. Odpoveď: " . $result]);
    }
}
curl_close($ch);
?>
