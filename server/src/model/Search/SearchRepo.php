<?php

class SearchRepo extends ConnectDB {
    public function search($search, $table) {
        try {
            $searchs = [];
            $search_term = $this->conn->real_escape_string($search);
            $query = "SELECT * FROM $table WHERE ";
    
            $result = $this->conn->query("SHOW COLUMNS FROM $table");
            $columns = array();
            while ($row = $result->fetch_assoc()) {
                $columns[] = $row['Field'];
            }
    
            $conditions = array();
            foreach ($columns as $column) {
                $conditions[] = "$column LIKE '%$search_term%'";
            }
            $query .= implode(" OR ", $conditions);

            $result = $this->conn->query($query);
            while ($row = $result->fetch_assoc()) {
                $searchs[] = $row;
            }

            return $searchs;
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}
