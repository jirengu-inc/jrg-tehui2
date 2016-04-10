<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-06 16:25:55
 * @version $Id$
 */
$name=$_GET["username"];
if($name==="wmsj"){
	$show=array("name"=>"wmsj","age"=>24,"sex"=>"男");
	echo json_encode($show);
}else if($name==="wm"){
	$show=array("name"=>"wm","age"=>14,"sex"=>"男");
	echo json_encode($show);
}else if($name==="wh"){
	$show=array("name"=>"wh","age"=>34,"sex"=>"女");
	echo json_encode($show);
}else{
	echo $show="您输入的名称未注册！";
}
// echo json_encode($show);