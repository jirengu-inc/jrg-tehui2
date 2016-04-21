<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-20 16:16:22
 * @version $Id$
 */
$status = $_REQUEST["status"];
// $status=1;
$img = array("img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg", "img/13.jpg", "img/14.jpg", "img/15.jpg", "img/16.jpg", "img/17.jpg", "img/18.jpg", "img/19.jpg", "img/20.jpg", "img/21.jpg", "img/22.jpg", "img/23.jpg", "img/24.jpg", "img/25.jpg", "img/26.jpg", "img/27.jpg", "img/28.jpg", "img/29.jpg", "img/30.jpg", "img/31.jpg", "img/32.jpg", "img/33.jpg", "img/34.jpg", "img/35.jpg", "img/36.jpg", "img/37.jpg", "img/38.jpg", "img/39.jpg", "img/40.jpg", "img/41.jpg", "img/42.jpg", "img/43.jpg", "img/44.jpg", "img/45.jpg", "img/46.jpg", "img/47.jpg", "img/48.jpg", "img/49.jpg", "img/50.jpg", "img/51.jpg", "img/52.jpg", "img/53.jpg", "img/54.jpg", "img/55.jpg", "img/56.jpg", "img/57.jpg", "img/58.jpg");
// if($status === "1"){
// 	$status = "wmsj100";
// };	//这样的验证完全没有意义，因为status的发送和接收信息都可以再js中看到。
// $newArr = array("status"=>$status,"dataImg"=>$img);
// $img = array("img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg", "img/13.jpg", "img/14.jpg", "img/15.jpg", "img/16.jpg", "img/17.jpg", "img/18.jpg", "img/19.jpg", "img/20.jpg");
if($status === "1"){
echo json_encode($img);
}
// echo json_encode($newArr);
