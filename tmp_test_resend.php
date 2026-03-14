<?php
$api_key = 're_b9XkGpLK_34MUdkBszbkRc4s57Zf4s1q6';
$to = "turlik.adrian167@gmail.com";
$email_subject = "Test from AI Agent";
$email_html = "<h1>Test</h1><p>Testing Resend API from local environment.</p>";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'from' => 'FC Poprad <onboarding@resend.dev>',
    'to' => [$to],
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
    echo "Error: " . curl_error($ch) . "\n";
} else {
    echo "HTTP Code: " . $http_code . "\n";
    echo "Result: " . $result . "\n";
}
curl_close($ch);
?>
