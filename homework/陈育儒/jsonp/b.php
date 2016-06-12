<?php
    $name = $_GET['name'];
    if($name === 'hunger'){
        $arr = array('a'=>1);
    }else{
        $arr = 'none';
    }
    $res = json_encode($arr);
    $callback = $_GET['callback'];
    echo $callback.'('.$res.')';
  ?>