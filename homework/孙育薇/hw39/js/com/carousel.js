//首屏大图为全屏轮播
define(['jquery'],function($){
//轮播
//前提:给定节点下有ul子元素,其子元素li中含data-img属性,属性中为作为背景图显示的图片地址
//实现:不改变DOM顺序,头尾添加额外li
//可选:添加底部导航,点击相应 dot 转到对应的图片
//可选:添加左右导航,点击转到上/下一张
	function Carousel($node) {
		this.$node = $node.find("ul");
		this.singleWidth = this.$node.children("li").width();
		this.realCount = this.$node.children("li").length;
		this.addExtraItem();
		this.$items = this.$node.children();
		this.total = this.$node.children("li").length;
		this.totalWidth = this.singleWidth * this.total;
		this.curIdx = 1;
		this.isAnimate = false;
		this.enabledDotNav = false;
		this.allImgLoaded = false;
	}

	Carousel.prototype = {
		addExtraItem : function() {
			var $first = this.$node.children().first();
			var $last = this.$node.children().last();
			var $parent = $first.parent();
			$first.clone().appendTo($parent);
			$last.clone().prependTo($parent);
		},
		onStart : function() {
			this.$node.css({
				"left": 0-this.singleWidth,
				"width": this.totalWidth
			});
			this.$items.css("width", this.singleWidth);
		},
		setImg : function(idx) {
			var $node = this.$items.eq(idx);
			var imgUrl = $node.attr("data-img");
			$node.css({
				"background-image": "url("+ imgUrl +")",
				"background-size": "cover"
			});
			$node.attr("img-set", "true");
		},
		play : function(n) {
			var me = this;
			if(this.$items.eq(n).attr("img-set") != "true") {
				this.setImg(n);
			}
			this.$node.animate({
				"left": -this.singleWidth * n
			}, 1000, function() {
				if(me.enabledDotNav){
					me.$dotNavCt.children().each(function (index) {
						$(this).removeClass("active");
						if (index === n - 1) {
							$(this).addClass("active");
						}
					});
				}
				me.isAnimate = false;
			});
			if(n === this.realCount) {
				this.allImgLoaded = true;
			}
		},
		playNext : function() {
			if (this.isAnimate) {
				return;
			}
			this.isAnimate = true;
			if (this.curIdx === this.realCount) {
				this.curIdx = 0;
				if(this.$items.eq(0).attr("img-set") != "true") {
					this.setImg(this.curIdx);
				}
				this.$node.css({
					"left": -this.singleWidth * this.curIdx
				});
			}
			this.play(++this.curIdx);
		},
		playPrev : function() {
			if (this.isAnimate) {
				return;
			}
			this.isAnimate = true;
			if (this.curIdx === 1) {
				this.curIdx = this.realCount + 1;
				if(this.$items.eq(this.curIdx).attr("img-set") != "true") {
					this.setImg(this.curIdx);
				}
			}
			this.$node.css({
				"left": -this.singleWidth * this.curIdx
			});
			this.play(--this.curIdx);
		},
		autoPlay : function() {
			var me = this;
			this.clock = setInterval(function() {
				me.playNext();
			}, 4000);
		},
		stopAutoPlay : function() {
			clearInterval(this.clock);
		},
		addDotNav : function() {
			this.$dotNavCt = $('<ul class="dot-nav"></ul>');
			this.$dotNavCt.append($('<li class="active"></li>'));
			for (var i = 1; i < this.realCount; i++) {
				var $li = $('<li></li>');
				this.$dotNavCt.append($li);
			}
			this.$node.parent().append(this.$dotNavCt);
			this.$dotNavCt.width(this.$dotNavCt.children().outerWidth(true) * this.realCount);
			this.$dotNavCt.css("margin-left", parseInt(-(this.$dotNavCt.width() / 2)));
		},
		addArrowNav : function() {
			this.$arrowPrev = $('<a class="carousel-arrow arrow-prev" href="#">&lt;</a>');
			this.$arrowNext = $('<a class="carousel-arrow arrow-next" href="#">&gt;</a>');
			this.$node.parent().append(this.$arrowPrev);
			this.$node.parent().append(this.$arrowNext);
		},
		bindEvent : function(type) {
			var me = this;
			if (type === "dotNav") {
				this.$dotNavCt.children().each(function(index) {
					$(this).on("click", function() {
						if (!me.isAnimate){
							me.isAnimate = true;
							me.curIdx = index + 1;
							if(me.$node.children().eq(me.curIdx).attr("img-set") != "true") {
								me.setImg(me.curIdx);
							}
							//全部图片已加载,则直接使用动画
							//使用allImgLoaded,只要循环过一遍之后就不需要再进行下面的判断了.
							if(me.allImgLoaded) {
								me.play(me.curIdx);
							} else {
								//刚打开页面,还没循环完一遍之前,直接跳到后面某一张时,中间都是空白
								//判断如果点击按钮对应的图片之前有未加载的图片,则直接跳转,不使用动画,如果全部已加载则使用动画
								var hasNotLoaded = false;
								for(var i = 0; i <= index; i++) {
									if(me.$items.eq(i).attr("img-set") != "true") {
										hasNotLoaded = true;
										break; //有一张没加载就不使用动画
									}
								}
								if(hasNotLoaded) {
									me.$node.css({
										"left": -me.singleWidth * me.curIdx
									});
									me.$dotNavCt.children().removeClass("active");
									me.$dotNavCt.children().eq(index).addClass("active");
								} else {
									me.play(me.curIdx);
									//极端情况下,有可能所有图片的加载都是通过点击 dot 完成的,这样play()完全没有执行的机会,allImgLoaded就一直无法变成true.为避免每次都要判断hasNotLoaded,当这里确定所有图片已加载后,也将allImgLoaded设为true
									me.allImgLoaded = true;
								}
							}
							me.isAnimate = false;
						}
					})
				});
			}
			if (type === "arrowNav") {
				this.$arrowPrev.on("click", function(e) {
					e.preventDefault();
					if (!me.isAnimate){
						me.playPrev();
					}
				});
				this.$arrowNext.on("click", function(e) {
					e.preventDefault();
					if (!me.isAnimate) {
						me.playNext();
					}
				});
			}
		},
		enableDotNav : function() {
			this.addDotNav();
			this.enabledDotNav = true;
			this.bindEvent("dotNav");
		},
		enableArrowNav : function() {
			this.addArrowNav();
			this.bindEvent("arrowNav");
		},
		resetVal: function() {
			this.stopAutoPlay();
			this.$node.children("li").width($(window).width());
			this.singleWidth = this.$node.children("li").width();
			this.totalWidth = this.singleWidth * this.total;
		},
		resizeReload : function() {
			var me = this;
			var clock;
			$(window).on("resize",function() {
				if(clock) {
					clearTimeout(clock);
				}
				clock = setTimeout(function() {
					me.resetVal();
					me.init();
				},300);

			})
		},
		init : function() {
			this.onStart();
			this.setImg(1);
			this.autoPlay();
			this.resizeReload();
		}
	};
	return Carousel;
});