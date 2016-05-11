

<?php

    $start = $_GET["start"];
    $len = $_GET["len"];
    $list = array();

    for ($i = 0; $i < $len; $i++) {
        array_push($list, "内容" . ($start + $i));
    }

    $data = array("status"=>1, "data"=>$list);

    sleep(1); 
    echo json_encode($data);

 ?>

