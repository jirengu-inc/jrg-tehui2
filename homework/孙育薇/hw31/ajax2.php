<?php
    if (isset($_GET["secret"])) {
        $secret = trim($_GET["secret"]);
        if ($secret == "TELLME!") {
            $text = "哈哈哈，今天是个好节日!";
        } else {
            $text = "不想知道就算了，你错过了一个好秘密~";
        }
        $data = array("status"=>1, "text"=>$text);
    } else {
        $data = array("status"=>0);
    }

    $result = json_encode($data);

    $callback=$_GET['callback'];
    echo $callback."($result)";
