/**
 * Created by Yakumo on 16/5/20.
 */
//Tips: 
//     1.使用的之前，请将你页面上导航栏里面的锚点和你想跳转的ID都对应设置好；
//     2.$node是你页面上导航栏的ID，原理利用attr找到href后面，然后找到页面对应DOM，根据其offset().top进行滚动；
//     3.speed是跳转速度，你可以设置你想要的，如果不设置默认就是500ms；
define(['jquery'],function($){
	function JumpTo($node,speed) {
		this.$node = $node;
		this.bindEvent();
		this.speed = speed||500;
	}
	JumpTo.prototype = {
		bindEvent : function() {
			this.$node.on("click", function () {
				$("body").animate({
					"scrollTop": $($(this).attr("href")).offset().top
				}, this.speed);
			});
		}
	};
	return JumpTo;
});
