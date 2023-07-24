<?php
    error_reporting(E_ALL & ~E_NOTICE); //ignore notice and warnings for now, 
        //if not, php will include it in the response
        //to do: resolve line 7 if route is login and error_reporting is removed.

    $jsonStr = file_get_contents('php://input');
    $jsonData = json_decode($jsonStr);

    $action = $jsonData->action;
    $data = $jsonData->data;

    switch ($action) {
        case 'signup':
            require_once 'Account.php';
            $res = new Account($data);
            $res = $res->signup();
            break;
        case 'contact_list':
            require_once 'Account.php';
            $res = new Account($data);
            $res = $res->getData();
            break;
        case 'login':
            require_once 'Account.php';
            $res = new Account($data);
            $res = $res->login();
            break;
        case 'logout':
            require_once 'Account.php';
            $res = new Account($data);
            $res = $res->logout();
            break;
        case 'get_conversation':
            require_once 'Chat.php';
            $res = new Chat($data);
            $res = $res->getData();
            break;
        case 'send_conversation':
            require_once 'Chat.php';
            $res = new Chat($data);
            $res = $res->postData();
            break;
        default:
            $res = new stdClass();
            $res = json_encode($res);
            break;
    }

    header('Content-Type: application/json');
    echo $res;
?>