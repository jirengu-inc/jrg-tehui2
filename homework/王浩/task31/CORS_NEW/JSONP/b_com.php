<?php
$data = $_REQUEST["data"];
$name = $_REQUEST["name"];
$info = '{
	"state": "1",
	"value": {
		"1": {
			"name": "name",
			"value": "wmsj100"
		},
		"2": {
			"name": "age",
			"value": "10"
		},
		"3": {
			"name": "sex",
			"value": "male"
		},
		"4": {
			"name": "work",
			"value": "coder"
		}
	}
}';
echo $name.".".$data."(".$info.")";