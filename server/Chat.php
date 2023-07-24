<?php
    require_once "BaseCode.php";

    class Chat extends BaseCode {


        private $data;

        public function __construct($params) {
            parent::__construct();

            $cdata = $params->cdata ?: null;
            $cuser = $params->cuser ? mysqli_real_escape_string($this->db->conn, $params->cuser) : null;
            $cmessage = $params->cmessage ? mysqli_real_escape_string($this->db->conn, $params->cmessage) : null;

            $this->data = [
                'cuser' => $cuser,
                'cdata' => $cdata,
                'cmessage' => $cmessage
            ];
        }

        public function getData() {
            
            $cdata = $this->data['cdata'];
            $cuser = $this->data['cuser'];

            //get room
            $query = "SELECT * FROM master_chatroom 
            WHERE (room_name = '".$cdata->username."' AND created_by = '$cuser')
                OR
                (room_name = '$cuser' AND created_by = '".$cdata->username."')";
            $query = $this->db->sel($query);

            if (!$query) {
                $ccon = false;
            } else {
                //get messages according to roomid
                $query = "SELECT * FROM master_message 
                WHERE room_id = ".$query[0]['room_id']."
                ORDER BY created_date";

                $query = $this->db->sel($query);

                $ccon = true;
            }
            


            $response = [
                'has_conversation' => $ccon,
                'data' => $query
            ];
            
            return json_encode($response);
        }

        public function postData() {
            $cdata = $this->data['cdata'];
            $cuser = $this->data['cuser'];
            $cmessage = $this->data['cmessage'];

            //get room
            $query = "SELECT * FROM master_chatroom 
                WHERE (room_name = '".$cdata->username."' AND created_by = '$cuser')
                    OR
                    (room_name = '$cuser' AND created_by = '".$cdata->username."')";
            $query = $this->db->sel($query);

            if (!$query) {
                //no conversation yet then create
                $query = "INSERT INTO master_chatroom (room_name, created_by) 
                 VALUES ('".$cdata->username."','$cuser')";
                $this->db->exe($query);
            }

            $query = "SELECT * FROM master_chatroom 
                WHERE (room_name = '".$cdata->username."' AND created_by = '$cuser')
                    OR
                    (room_name = '$cuser' AND created_by = '".$cdata->username."')";
            $roomId = $this->db->sel($query)[0]['room_id'];
            $currentDate = date("Y-m-d H:i:s");

            $query = "INSERT INTO master_message (room_id, message_content, message_sender, created_date) 
            VALUES ('$roomId','$cmessage','$cuser','$currentDate')";
            $this->db->exe($query);

            $response = [
                'has_conversation' => true
            ];
            
            return json_encode($response);
        }
    }
?>