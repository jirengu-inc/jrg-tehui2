define(['jquery'],function($){
//曝光组件
	var Exposure = (function() {
		function isVisible($node) {
			return ($(window).scrollTop() + $(window).width() > $node.offset().top);
		}
		function bind(target, handler) {
			$(target).each(function() {
				var clock1;
				var $me = $(this);
				$(window).on("scroll", function() {
					if (clock1) {
						clearTimeout(clock1);
					}
					clock1 = setTimeout(function() {
						if(isVisible($me)){
							handler.call($me);
						}
					},300);
				});
			});
		}
		function one($target, handler) {
			$target.each(function() {
				var exposed = false;
				var clock2;
				var $me = $(this);
				$(window).on("scroll", function() {
					if (clock2) {
						clearTimeout(clock2);
					}
					clock2 = setTimeout(function() {
						if (exposed === true) {
							return false;
						}
						if (isVisible($me)) {
							exposed = true;
							handler.call($me);
						}
					},300);
				});
			});
		}
		return {
			bind: bind,
			one: one
		}
	})();
	return Exposure;
});