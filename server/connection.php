<?php
    $conn = new mysqli('localhost', 'root', '', 'rn_login');

    if (!$conn) {
        die("tidak dapat terhubung ke database");
    }
?>
