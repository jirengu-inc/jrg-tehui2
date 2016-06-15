<?php 
$str=$_POST["str"];
$num=$_POST["num"];
$arr=array();

for($i=1;$i<$num+1;$i++){
	array_push($arr,"内容".($str+$i));
}

$tem=array("status"=>1,"data"=>$arr);

echo
	json_encode($tem);

 ?>