<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-15 16:59:12
 * @version $Id$
 */
$status = $_REQUEST["status"];
// $status = "1";
if($status === "1"){
	$content = array(
		"img05" => "img/05.jpg",
		"img06" => "img/06.jpg",
		"img07" => "img/07.jpg",
		"img08" => "img/08.jpg",
		"img01" => "img/01.jpg",
		"img02" => "img/02.jpg",
		"img03" => "img/03.jpg",
		"img04" => "img/04.jpg"
	);
	$num =array("num" => count($content));
	$status = array("status" => "success");
	$wrap = array($status,$content,$num);
	echo json_encode($wrap);
	// echo count($content);
}
