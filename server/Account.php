<?php
    require_once "BaseCode.php";

    class Account extends BaseCode {

        private $data;

        public function __construct($params) {
            parent::__construct();

            $clist = $params->clist ? mysqli_real_escape_string($this->db->conn, $params->clist) : null;
            $cuser = $params->cuser ? mysqli_real_escape_string($this->db->conn, $params->cuser) : null;
            $cpassword = $params->cpassword ? mysqli_real_escape_string($this->db->conn, $params->cpassword) : null;
            $cemail = $params->cemail ? mysqli_real_escape_string($this->db->conn, $params->cemail) : null;

            $this->data = [
                'clist' => $clist,
                'cuser' => $cuser,
                'cpassword' => $cpassword,
                'cemail' => $cemail
            ];
        }

        public function getData() {
            $clist = $this->data['clist'];
            $cuser = $this->data['cuser'];

            $query = "SELECT * FROM master_user";

            if ($clist) {
                $q = $this->db->sel($query);
                return (json_encode(['data' => $q]));
            } else {
                $query .= " WHERE username = '$cuser'";
                $q = $this->db->sel($query);
            }
            
            return $q;
        }

        public function login() {
            $q = $this->getData($this->data);
            
            $cpassword = $this->data['cpassword'];
            
            if (!$q) {
                $success = false;
                $message = 'Account does not exists.';
            } else {
                //update active column
                $query = "UPDATE master_user SET active = 1 WHERE username = '".$q[0]['username']."'";
                $this->db->exe($query);
            }

            if ($q && $q[0]['password'] != $cpassword) {
                $success = false;
                $message = 'Password is incorrect.';
            }

            $response = [
                'success' => is_null($success) ? true : false,
                'message' => $message ?: 'Logged on succcessfully.',
                'data' => $q[0]['username']
            ];
            
            return json_encode($response);
        }

        public function signup() {
            $cuser = $this->data['cuser'];
            $cemail = $this->data['cemail'];
            $cpassword = $this->data['cpassword'];

            if (empty($cuser) || empty($cemail) || empty($cpassword)) 
                echo "All input fields are required.";

            $q = $this->getData($this->data);

            if (!$q) {
                $query = "INSERT INTO master_user
                VALUES ('$cuser','$cemail','$cpassword','0')";

                $this->db->exe($query);
                
                $response = [
                    'success' => true,
                    'message' => 'Account successfully created'
                ];

                return json_encode($response);
            }

            $response = [
                'success' => false,
                'message' => 'Account already exists.'
            ];

            return json_encode($response);
        }

        public function logout() {
            $query = "UPDATE master_user SET active = 0 WHERE username = '".$this->data['cuser']."'";
            $this->db->exe($query);
            return;
        }
    }
?>