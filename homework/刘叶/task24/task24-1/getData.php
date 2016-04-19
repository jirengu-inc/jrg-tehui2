
<?php
	$arr = array('username'=>$_GET['username'],'password'=>$_GET['password']);
	if ($_GET['username']==='xiaoming'||$_GET['password']==='abcd1234'){
		echo '{status: 0}';
	}
?>