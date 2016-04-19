<?php
/**
 * Created by PhpStorm.
 * User: ran
 * Date: 2016/4/19
 * Time: 15:11
 */
$username= $_POST['userName'];
if ($username == 'ran'){
    $arr = array('data'=>false);
    echo json_encode($arr);
}
else{
    $arr = array('data'=>true);
    echo json_encode($arr);
}
?>