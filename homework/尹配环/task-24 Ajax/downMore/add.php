<?php
	$start = $_POST["start"];
	$len = $_POST["len"];
	// $start = 3;
	// $len = 6;
	$temp = array();
	if ($start >= 0 || $len > 0) {
		$status = 1 ; //正常
	}else{
		$status = 0 ;
	}
	

	for ($i=0; $i < $len ; $i++) { 
		array_push($temp, ($start+$i));
	}
	$arr = array("status"=>$status,"data"=>$temp);
	echo json_encode($arr);

