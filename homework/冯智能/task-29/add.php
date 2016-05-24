<?php
	$start = $_POST["start"];
	$len = $_POST["len"];
	$temp = array();
	
	for ($i=0; $i < $len ; $i++) { 
		array_push($temp, ($start+$i));
	}
	$arr = array("status"=>1,"data"=>$temp);
	echo json_encode($arr);

