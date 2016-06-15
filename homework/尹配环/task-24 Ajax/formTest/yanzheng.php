<?php
	$username = $_POST["username"];

	if ($username == "hunger"){
		$result = 1;
	} else {
		$result = 0;
	}
	$arr = array('result' => $result);
	echo json_encode($arr);
?>