 <?php
 	$start = $_GET['start'];
 	$len = $_GET['len'];
 	$liContent = array();

 	for ($i=0; $i < $len; $i++) {
 		array_push($liContent, "內容".($start + $i + 1));
 	}
 	$arr = array('data'=>$liContent, 'status'=>1);
    sleep(1);
 	echo json_encode($arr);

 ?>
