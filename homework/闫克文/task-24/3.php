<?php
	$username= $_POST['username'];
	if ($username == 'hunger') {
		$arr = array('status'=>false);
		echo json_encode($arr);
        echo "\r\n<!--";
	}else {
		$arr = array('status'=>true);
		echo json_encode($arr);	
        echo "\r\n<!--";
	}
?>