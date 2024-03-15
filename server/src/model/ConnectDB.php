<?php
class ConnectDB {
    private $servername = DB_HOST;
    private $username = DB_USERNAME;
    private $password = DB_PASSWORD;
    private $dbName = DB_NAME;
    protected $conn;

    public function __construct() {
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbName);

        if (!$this->conn) {
            die("Connection failed: ". mysqli_connect_error());
        }
    }
}