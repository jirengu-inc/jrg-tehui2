//为jQuery对象扩展一个backtop插件
//$(document).backtop();//调用backtop插件

(function ($) {
	$.fn.backtop = function(){
		//防止重复添加
		if($('#back-top').length>0){
			console.log("backTop existed !!!")
			return;
		};
		console.log("added backTop !!!");

		var $backTop = $('<div id="back-top">Top</div>')//设置backTop样式，可改
			.css({
			'position': 'fixed',
			'width': '40px',
			'height': '40px',
			'line-height': '40px',
			'text-align': 'center',
			'border-radius': '40px',
			'color': '#fff',
			'font-family': 'Microsoft YaHei',
			'right': '50px',
			'bottom': '100px',
			'background-color': '#333',
			'opacity': '0.5',
			'z-index': '9999',
			'display': 'none',
			'cursor': 'pointer'			
		}).hover(function () {
			 $(this).css({'opacity':'0.8'});
		},function () {
			 $(this).css({'opacity':'0.5'});
		});

		$('body').append($backTop);//添加backTop到DOM中
		
		//侦测窗口滑动距离，100px可改
		$(window).on('scroll',function () {
			 var offsetTop  = $('body').scrollTop();
			 if (offsetTop > 100) {
			 	$backTop.fadeIn('fast');
			 }else{
			 	$backTop.fadeOut('fast');
			 }
		});
		$backTop.on('click',function(){
			//缓缓回到顶部，500ms可改
			 $("body").animate({scrollTop:0},500);
		});
	};
})(jQuery);

