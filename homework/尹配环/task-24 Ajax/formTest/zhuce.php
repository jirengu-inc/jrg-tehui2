<?php
	$temp = "注册成功，用户名：".$_POST["username"]."，密码：".$_POST["password"];
	$arr = array('result' =>$temp);
	echo json_encode($arr);
?>