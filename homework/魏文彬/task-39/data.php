<?php
    // 后端 php 测试接口文件
    $start = $_GET['start']; //0
    $len = $_GET['len'];  //3
    $ret = array();
    $data = array(array('url'=>'images/roundicons.png','h'=>'Round Icons','p'=>'Graphic Design'),
                  array('url'=>'images/w1.jpg','h'=>'Startup Framework','p'=>'Website Design'),
                  array('url'=>'images/startup-framework.png','h'=>'Treehouse','p'=>'Website Design'),
                  array('url'=>'images/w2.jpg','h'=>'Golden','p'=>'Website Design'),
                  array('url'=>'images/w5.jpg','h'=>'Escapa','p'=>'Website Design'),
                  array('url'=>'images/escape.png','h'=>'Dreams','p'=>'Website Design'),
    );
 
    for($i = $start; $i < $len+$start; $i++){
        array_push($ret, $data[$i]);
    };

    echo json_encode($ret);












