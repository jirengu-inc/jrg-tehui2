<?php
    $start = $_GET["start"];
    $len = $_GET["len"];
    $list = array();

    for ($i = 0; $i < $len; $i++) {
        array_push($list, "内容" . ($start + $i));
    }

    $data = array("status"=>1, "list"=>$list);

    sleep(1); //测试响应未完成时的状态
    echo json_encode($data);