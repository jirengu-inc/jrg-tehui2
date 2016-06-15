<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-13 05:57:22
 * @version $Id$
 */
$start=$_REQUEST["start"];
$len=$_REQUEST["len"];
// $start=3;
// $len=4;
$items=array();
for($i=0;$i<$len;$i++){
	array_push($items, "内容".($i+$start));
}
$status="success";
$result=array("status"=>$status,"items"=>$items);
sleep(1);
echo json_encode($result);
