<?php 
$str=$_POST["str"];
$num=$_POST["num"];
$arr=array();

for($i=0;$i<$num;$i++){
	array_push($arr,"内容".($str+$i));
}

$tem=array("status"=>1,"data"=>$arr);

sleep(1.5);
echo
	json_encode($tem);

 ?>