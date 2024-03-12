<?php

include __DIR__ . '/../../connection/ConnectDB.php';

class TaiKhoanRepo {
    public function getData() : array | null {
        try {
            
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage() . '<br>';
        }
        return null;
    }
}