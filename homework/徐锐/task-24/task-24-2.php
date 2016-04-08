<?php

header('Content-type:text/html; charset="utf-8"');
    $start = 2;
    $len = 6;
    $items = array();
    for ($i = 0; $i < $len; $i++) {
        array_push($items, "内容");
    }
    $ret = array("status"=>1, "data"=>$items);
    sleep(1);
    echo json_encode($ret);