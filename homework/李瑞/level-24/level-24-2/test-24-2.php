<?php
    $start = $_GET["start"];
    $len = $_GET["len"];
    $list = array();

    for ($i = 0; $i < $len; $i++) {
        array_push($list, "内容" . ($start + $i));
    }

    $data = array("status"=>1, "list"=>$list);

  sleep(1.5);//模拟速度比较慢的情况。
    echo json_encode($data);
