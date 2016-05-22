/**
 * Created by Yakumo on 16/5/20.
 */
//Tips:
//     1.$node是你选取的元素
//     2.n是你希望在哪个部位曝光，例如我设置1/2，就是到窗口到该元素一半的时候，就开始展现元素全貌
//     3.如果n不设置的话，就是默认2/3
define(['jquery'],function($){
	function Exposure($node,n) {
		this.$node = $node;
		this.setCoser();
		this.bind(n);
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
		bind : function(n) {
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

