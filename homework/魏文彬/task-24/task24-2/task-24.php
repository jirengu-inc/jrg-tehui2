<?php
header('Content-type:text/html; charset="utf-8"');
	$present = $_GET['present'];
	$len = $_GET['len'];
	$liContent = array();
	for ($i=0; $i < $len; $i++) {
		array_push($liContent, "內容".($present + $i + 1));
	}
	$arr = array('data'=>$liContent);
	echo json_encode($arr);
?>