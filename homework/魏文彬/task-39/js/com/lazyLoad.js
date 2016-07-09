// 默认隐藏元素 当用户看到元素时 再渐变展示
define(['jquery'],function($){

	function lazyLoad($node){
		$node.css('opacity', '0');
		$(window).on('scroll',function(){
			var nodeTop=$node.offset().top;
			var scroll=$(window).scrollTop();
			var windowH=$(window).height();
			if(scroll+windowH>nodeTop){
				$node.fadeTo(2000,1);
			}
		});
	};
	return lazyLoad;
});