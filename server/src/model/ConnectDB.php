<?php

class ConnectDB {
    private $servername;
    private $username;
    private $password;
    private $database;
    public $conn;

    public function __construct() {
        $this->servername = "localhost";
        $this->username = "root";
        $this->password = "Giau0964184548@";
        $this->database = "web4";
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->database);

        if (!$this->conn) {
            die("Connection failed: ". mysqli_connect_error());
        }
    }

    public function select($sql) {
        $result = mysqli_query($this->conn, $sql);

        if (!$result) {
            die("Query failed: ". mysqli_error($this->conn));
        }

        return $result;
    }

    public function excute($sql) {
        mysqli_query($this->conn, $sql);

        if (mysqli_affected_rows($this->conn) === -1) {
            die("Execution failed: ". mysqli_error($this->conn));
        }
    }

    public function query($sql) {
        // Thực hiện truy vấn SQL và trả về kết quả
        return mysqli_query($this->conn, $sql);
    }

    public function last_id($sql) {
        $this->excute($sql);
        $last_id = mysqli_insert_id($this->conn);
        return $last_id;
    }

    
}