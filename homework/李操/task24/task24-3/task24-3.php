<?php
	$username= $_POST['userName'];
	sleep(0.5);//模拟后台返回数据比较慢
	if ($username == 'licao'){
		$arr = array('data'=>false);
		echo json_encode($arr);
	}
	else{
		$arr = array('data'=>true);
		echo json_encode($arr);		
	}
?>