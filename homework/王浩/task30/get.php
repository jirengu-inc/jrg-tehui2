<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-24 09:25:07
 * @version $Id$
 */
$status = $_REQUEST["status"];
// $status = "1";
$ct = array(
		"ct1" => '[200,100,"#DE4A4A"]',
		"ct2" => '[200,200,"#900D0D"]',
		"ct3" => '[200,380,"#E14399"]',
		"ct4" => '[200,220,"#3C13BA"]',
		"ct5" => '[200,400,"#EA612B"]',
		"ct6" => '[200,350,"#B2751F"]',
		"ct7" => '[200,190,"#F8B107"]',
		"ct8" => '[200,430,"#8CC60D"]',
		"ct9" => '[200,550,"#7CFE04"]',
		"ct10" => '[200,200,"#37DD8B"]',
		"ct11" => '[200,180,"#20D97D"]',
		"ct12" => '[200,320,"#10E9DE"]',
		"ct13" => '[200,150,"#609DEA"]',
		"ct14" => '[200,280,"#4022DD"]',
		"ct15" => '[200,450,"#221A1A"]',
		"ct16" => '[200,200,"#AA613E"]',
		"ct17" => '[200,100,"#AA003E"]',
		"ct18" => '[200,240,"#AA443E"]',
		"ct19" => '[200,300,"#AA663E"]',
		"ct20" => '[200,420,"#AA994E"]',
		"ct21" => '[200,250,"#AA6100"]',
		"ct22" => '[200,320,"#AA6144"]',
		"ct23" => '[200,150,"#AA6166"]',
		"ct24" => '[200,260,"#AA6199"]',
		"ct25" => '[200,350,"#AA61EE"]'
	);
$export = array("status"=>"success", "items"=>$ct);
if($status === "1"){
	echo json_encode($export);
}

