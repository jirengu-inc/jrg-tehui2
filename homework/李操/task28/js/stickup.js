//stickup插件
(function ($) {
$.fn.stickup = function (handler) {
	 var $cur = this,
	 	 curHeight = $cur.height(),
	 	 curWidth = $cur.width(),
	 	 offsetTop = $cur.offset().top,
	 	 offsetLeft = $cur.offset().left,
	 	 onChange = handler || function () {};

	//克隆一个并让他隐藏
	var $clone = $cur.clone()//链式写法
				.css('opacity',0)//保证看到的只有一个
				.insertBefore($cur)
				.hide();

	$(window).on('scroll',function () {
		 if ($(this).scrollTop() >= offsetTop) {
		 	if (!isFixed()) {
		 		// console.log(1);
		 		setFixed();
		 	}
		 }else{
		 	if(isFixed()){
		 		unsetFixed();
		 	}
		 }
	});

	function isFixed () {
		 return !!$cur.attr('fixed');
	}

	function setFixed () {
		 $cur.attr('fixed',true)//绑定自定义属性作为标识位
		 .css({
		 	position: 'fixed',
		 	top: 0,
		 	left: offsetLeft,
		 	'z-index': 999,
		 	width: curWidth,
		 	margin: 0
		 });
		 $clone.show();
	}

	function unsetFixed () {
		 $cur.removeAttr('fixed') 
		 .removeAttr('style');
		 $clone.hide();
	}
};

})($)