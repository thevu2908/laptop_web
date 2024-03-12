<?php

require __DIR__ . '/../config/config.php';

class ConnectDB {
    public static function getConnection() {
        return new PDO("mysql:host=".servername.";dbname=".database.";charset=UTF8", username, password);
    }
}   