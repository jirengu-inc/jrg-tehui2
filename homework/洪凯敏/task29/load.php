<?php
    $start =$_POST['start'];
    $size =$_POST['size'];
    $items = array();
 
    for($i = 0; $i < $size; $i++){
        array_push($items, '内容' . ($start+$i));
    }
    $items['status']='succ';
    echo json_encode($items);