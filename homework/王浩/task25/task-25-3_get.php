<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-10 18:53:14
 * @version $Id$
 */
$className=$_GET["className"];
// $className="addmore-jiez";
$jiez_1=array("img/jiez-1.jpg","镀18k玫瑰金简约光面戒指","￥699.00");
$jiez_2=array("img/jiez-2.jpg","钻石谷白18K金钻石戒指女正品","￥799.00");
$jiez_3=array("img/jiez-3.jpg","范琦彩金戒指环结婚情侣对戒","￥558.00");
$content_jiez=array($jiez_1,$jiez_2,$jiez_3);
if($className==="addmore-jiez"){
	echo json_encode($content_jiez);
		};

$zhub_1=array("img/baos-1.jpg","18K金镶嵌彩色宝石戒指","￥15168.00");
$zhub_2=array("img/baos-2.jpg","米莱珠宝鸽血红红碧玺戒指","￥5348.00");
$zhub_3=array("img/baos-3.jpg","米莱天然鸽血红碧玺戒指","￥2529.00");
$content_zhub=array($zhub_1,$zhub_2,$zhub_3);
if($className==="addmore-zhub"){
	echo json_encode($content_zhub);
}

$gold_1=array("img/gold-1.jpg","黄金投资金条金砖","￥5480.00");
$gold_2=array("img/gold-2.jpg","足金黄金收藏投资送礼","￥7460.00");
$gold_3=array("img/gold-3.jpg","Au9999金砖20g薄片金条","￥5492.00");
$content_gold=array($gold_1,$gold_2,$gold_3);
if($className==="addmore-gold"){
	echo json_encode($content_gold);
		}