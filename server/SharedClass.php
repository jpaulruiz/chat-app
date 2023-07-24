<?php

    class SharedClass {
        static public function &getInstance($class) {
            static $classList = [];

            if (array_key_exists($class, $classList)) {
                $instance =& $classList[$class];
            } else {
                //not yet exist then create
                $classList[$class] = new $class();
                $instance =& $classList[$class];
            }

            return $instance;
        }
    }
?>