<?php
$username= $_POST['userName'];
if ($username == 'luyoyo'){
    $arr = array('data'=>false);
    echo json_encode($arr);
}
else{
    $arr = array('data'=>true);
    echo json_encode($arr);
}
?>