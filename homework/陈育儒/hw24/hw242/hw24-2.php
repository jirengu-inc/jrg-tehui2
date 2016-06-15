<?php
    $start = $_GET["start"];//接受数据
    $len = $_GET["len"];
    $list = array();

    for ($i = 0; $i < $len; $i++) {
        array_push($list, "内容" . ($start + $i));//
    }

    $data = array("status"=>1, "list"=>$list);//键对，通过list[0,1,2,3]访问数据

  sleep(1);//模拟速度比较慢的情况。
  echo json_encode($data);//发送数据
  ?>