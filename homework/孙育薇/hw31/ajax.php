<?php
    header('Access-Control-Allow-Origin: http://book.jirengu.com');

    if (isset($_GET["secret"])) {
        $secret = trim($_GET["secret"]);
        if ($secret == "TELLME!") {
            $text = "哈哈哈,今天是个好节日!";
            $data = array("status"=>1, "text"=>$text);
        }
    } else {
        $data = array("status"=>0);
    }
    echo json_encode($data);