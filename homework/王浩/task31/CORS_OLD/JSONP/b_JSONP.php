<?php
$jsonpData = $_GET["callback"];
$content = '{"item1": "#D34545", "item2": "#CCC83C", "item3": "#2DDF43", "item4": "#9628DD"}';
echo $jsonpData."(".json_encode($content).")";