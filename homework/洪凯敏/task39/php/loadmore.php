<?php
    $len = $_POST['amount'];  //4
    $items = array();
    for($i = 0; $i < $len; $i++){
        array_push($items, './img/phpImg/' . (1+$i));
    }
    $ret = array('status'=>1, 'data'=>$items);
//{status: 1, data: ['./img/phpImg/1','./img/phpImg/2','./img/phpImg/3','./img/phpImg/4']}
    echo json_encode($ret);