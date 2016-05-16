define(['jquery'], function($) {
	//动画效果实现 Anchor 跳转
	function JumpTo($node) {
		this.$node = $node;
		this.bindEvent();
	}
	JumpTo.prototype = {
		bindEvent : function() {
			this.$node.on("click", function () {
				$("body").animate({
					"scrollTop": $($(this).attr("href")).offset().top
				}, 500);
				return false;
			});
		}
	};
	return JumpTo;
});