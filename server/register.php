<?php

include "connection.php";

$data = json_decode(file_get_contents('php://input'), true);

$username = $data["username"];
$email = $data["email"];
$password = $data["password"];

$result = $conn->query("INSERT INTO user(username, email, password) VALUES('$username', '$email', '$password')");

if ($conn->affected_rows) {
    echo "register_success";
} else {
    echo "register_failed";
}
?>