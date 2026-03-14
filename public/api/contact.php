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

$to = "turlik.adrian167@gmail.com"; // Tu si dajte váš cieľový mail

$email_subject = "Kontaktný formulár: " . $subject;
$email_html = "
    <h2>Dostali ste novú správu z webu FC Poprad - Stráže</h2>
    <p><strong>Od:</strong> {$name} ({$email})</p>
    <p><strong>Predmet:</strong> {$subject}</p>
    <p><strong>Správa:</strong><br>{$message}</p>
    <hr>
    <p><small>Táto správa bola tiež uložená v Supabase databáze.</small></p>
";

// Kontrola, či je dostupná funkcia curl_init
if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(["error" => "PHP rozšírenie CURL nie je na serveri povolené. Kontaktujte administrátora."]);
    exit;
}

// Resend API integrácia
$api_key = 're_b9XkGpLK_34MUdkBszbkRc4s57Zf4s1q6';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => 'FC Poprad <info@fcpoprad.info>', // Zmeňte po overení domény v Resend
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
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    http_response_code(500);
    echo json_encode(["error" => "Chyba pri komunikácii s e-mailovou bránou: " . $curl_error]);
} else {
    if ($http_code >= 200 && $http_code < 300) {
        echo json_encode(["success" => true, "message" => "Mail bol úspešne odoslaný"]);
    } else {
        http_response_code($http_code);
        $resend_response = json_decode($result, true);
        $error_msg = isset($resend_response['message']) ? $resend_response['message'] : $result;
        echo json_encode(["error" => "E-mailová brána (Resend) vrátila chybu: " . $error_msg]);
    }
}
?>
