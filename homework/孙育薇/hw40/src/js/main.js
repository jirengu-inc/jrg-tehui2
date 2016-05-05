requirejs.config({
	base: "./js",
	paths: {
		'jquery': 'lib/jquery'
	}
});

require(['jquery', 'com/carousel', 'com/exposure'], function($, Carousel, Exposure){

	var carousel = function() {
		$(this).each(function() {
			function Carousel($node) {
				var curIdx = 1;
				var $item = $node.find("li");
				var $parentNode = $item.parent();
				var sglWidth = $item.width();
				var realCount = $item.length;
				var totalCount = realCount + 2;
				var totalWidth = sglWidth * totalCount;
				var clock;
				function addExtraItem() {
					$parentNode.append($item.first().clone());
					$parentNode.prepend($item.last().clone());
				}
				function onStart() {
					addExtraItem();
					$node.width(sglWidth);
					$parentNode.css({
						width: totalWidth,
						left: -sglWidth
					});
				}
				function play(n) {
					$parentNode.animate({
						left: -sglWidth * n
					});
				}
				function playPrev() {
					if (curIdx === 1) {
						curIdx = realCount + 1;
						$parentNode.css({
							left: -sglWidth * curIdx
						});
					}
					play(--curIdx);
				}
				function playNext() {
					if (curIdx === realCount) {
						curIdx = 0;
						$parentNode.css({
							left: 0
						});
					}
					play(++curIdx);
				}
				function autoPlay() {
					clock = setInterval(function() {
						playNext();
					},3000);
				}
				function stopAutoPlay() {
					clearInterval(clock);
				}
				function init() {
					onStart();
					autoPlay();
				}
				init();
			}
			return Carousel($(this));
		});
	};

	$.fn.extend({
		carousel: carousel
	});

	// 要求：html 里有多个carousel，当调用时启动全部的 carousel
	//方式1
	//通过插件的方式启动所有轮播
	$('.carousel1').carousel();

	//方式2
	//通过创建对象的方式启动所有轮播
	$('.carousel2').each(function(){
		new Carousel($(this));
	});

	// Expouse可以针对不同元素做多次绑定

	//页面有多个.img-box'，当.img-box'曝光后，加载且仅加载一次里面的图片
	Exposure.one($('.img-box'), function(){
		var $img = $(this).find('img');
		$img.attr('src', $img.attr('data-src'));
	});
	//当页面上.ct-hunger 每次曝光时都执行函数smile
	Exposure.bind('.ct-hunger-smile', function(){
		smile($(this));
	});

	function smile($node) {
		$node.html($node.html() + "<p>Hi, give me a smile, please. :D</p>");
	}

});