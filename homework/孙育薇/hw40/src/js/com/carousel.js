//首屏大图为全屏轮播
define(['jquery'],function($){
//轮播组件
	function Carousel($node) {
		this.$node = $node;
		this.curIdx = 1;
		this.$item = $node.find("li");
		this.$parentNode = this.$item.parent();
		this.sglWidth = this.$item.width();
		this.realCount = this.$item.length;
		this.totalCount = this.realCount + 2;
		this.totalWidth = this.sglWidth * this.totalCount;
		this.init();
	}
	Carousel.prototype = {
		addExtraItem : function() {
			this.$parentNode.append(this.$item.first().clone());
			this.$parentNode.prepend(this.$item.last().clone());
		},
		onStart : function () {
			this.addExtraItem();
			this.$node.width(this.sglWidth);
			this.$parentNode.css({
				width: this.totalWidth,
				left: -this.sglWidth
			});
		},
		play : function (n) {
			this.$parentNode.animate({
				left: -this.sglWidth * n
			});
		},
		playPrev : function() {
			if (this.curIdx === 1) {
				this.curIdx = this.realCount + 1;
				this.$parentNode.css({
					left: -this.sglWidth * this.curIdx
				});
			}
			this.play(--this.curIdx);
		},
		playNext : function() {
			if (this.curIdx === this.realCount) {
				this.curIdx = 0;
				this.$parentNode.css({
					left: 0
				});
			}
			this.play(++this.curIdx);
		},
		autoPlay : function() {
			var me = this;
			this.clock = setInterval(function() {
				me.playNext();
			},3000);
		},
		stopAutoPlay : function() {
			clearInterval(this.clock);
		},
		init : function() {
			this.onStart();
			this.autoPlay();
		}
	};
	return Carousel;
});