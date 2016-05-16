<?php	
	$json_string = file_get_contents('waterfall.json');
	$raw_data = json_decode($json_string, true);	
	
	$works = $raw_data['works'];
	
	$len = count($works);
	$message = "";
	$error = false;
	
	if (isset($_GET['start']) && isset($_GET['count'])) {
		$start = trim($_GET['start']);
		$count = trim($_GET['count']);
	} else {
		$message = "No valid input";
		$error = true;
	}

	
	$items = array();
	if ($count <= $len - $start) {
		$items = set_item($start + $count);
	} else if ($start >= $len) {
		$items = [];
		$message = "No more data...";
		$error = true;
	} else {
		$items = set_item($len);
		$message = "No more data...";
	}

	
	function set_item($n) {
		$items = array();
		global $start;
		global $works;
		for ($i = $start; $i < $n; $i++) {
			array_push($items, $works[$i]); 
		}
		return $items;
	}	
	
//	var_dump($len);
//	var_dump($works[0]['title']);
	
	$data = array(
		"success" => true,
		"items" => $items,
		"message" => $message,
		"error" => $error
	);
	
	echo json_encode($data);
?>