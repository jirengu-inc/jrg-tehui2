<?php
   $username = $_POST['unserName'];
   sleep(0.5);
   if ($username == 'hunger'){
       $arr = array('data'=>false);
       echo json_encode($arr);
   }else{
       $arr = array('data'=>true);
       echo json_encode($arr);
   }