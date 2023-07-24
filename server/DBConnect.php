<?php

    class DBConnect {

        public $conn;
        public $conn_error;

        public function __construct() {
            $this->connect();
        }

        public function __destruct() {
            $this->conn->close();
        }

        public function connect() {
            $conn = new mysqli(
                "localhost",
                "root",
                "",
                "chat_app"
            );

            if ($conn->connect_error) {
                die("Connection failed.");
                $this->conn_error = $conn->connect_error;
            }

            $this->conn = $conn;
        }

        public function sel($query) {
            if ($this->conn_error) return 0;

            $res = $this->conn->query($query);
            $list = [];

            if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    $list[] = $row;
                }
                return $list;
            }

            return 0;
        }

        public function exe($query) {
            if ($this->conn_error) return 0;
            $res = $this->conn->query($query);
            if ($res) return $res;
            return 0;
        }
    }
?>