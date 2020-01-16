<?php

include "connection.php";

$data = json_decode(file_get_contents('php://input'), true);

$email = $data["email"];
$password = $data["password"];

$result = $conn->query("SELECT id, username, email FROM user WHERE email = '$email' AND password = '$password'");

if ($result->num_rows) {
    $user = json_encode($result->fetch_assoc());

    echo '{"status": "login_success", "user": '.$user.'}';
} else {
    echo '{"status": "login_failed"}';
}
?>
