//About 每个时间区块默认隐藏，曝光渐变展示
//可选: 元素到什么位置时显示, 默认出现1/3即显示
//TODO: 重复使用的曝光效果,包括页面往上滚时从上部渐变出现.
define(['jquery'],function($){
function Exposure($node,n) {
	this.$node = $node;
	this.setCoser();
	this.bindEvent(n);
}

Exposure.prototype = {
	isVisible : function(n) {
		var position = parseFloat(n) || 2/3;
		return ($(window).scrollTop() + parseInt($(window).height() * position ) > this.$cosNode.offset().top);
	},
	setCoser : function() {
		this.$cosNode = this.$node.clone();
		this.$cosNode.css("visibility", "hidden");
		this.$cosNode.insertAfter(this.$node);
		this.$node.hide();
	},
	destroyCoser : function() {
		this.$cosNode.remove();
	},
	bindEvent : function(n) {
		var me = this;
		$(window).on("scroll", function() {
			if(me.isVisible(n)) {
				me.destroyCoser();
				me.$node.fadeIn();
			}
		});
	}
};
	return Exposure;
});