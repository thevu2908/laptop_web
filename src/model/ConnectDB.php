<?php
class Database{
    private $servername;
    private $username;
    private $password;
    private $database;
    public $conn;
    public function __construct(){
        $this->servername = "localhost";
        $this->username = "root";
        $this->password = "";
        $this->database = "school";
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->database);
        if (!$this->conn) {
            die("Connection failed: ". mysqli_connect_error());
        }
    }
}
?>