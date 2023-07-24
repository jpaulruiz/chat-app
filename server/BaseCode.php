<?php

    require_once 'SharedClass.php';
    require_once 'DBConnect.php';

    class BaseCode extends SharedClass {

        public $db;

        public function __construct() {
            $this->db =& $this->getInstance('DBConnect');
        }
    }

?>