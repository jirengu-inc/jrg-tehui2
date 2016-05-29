/**
 * jquery 全屏轮播模块，不操作DOM
 */

define(['jquery'],function($){

	function Carousel($ct){
		var me = this;
		
		this.$ct = $ct;
        this.$bullet = this.$ct.parent().find('.bullet');
		addItems();                        //复制首尾li
		this.$items = this.$ct.children();
		this.itemWidth = $(window).width();     //全屏  非全屏时  宽度 = $(".ct").parent().outerWidth(true); 展示窗口的宽度
		this.itemHeight = $(window).height();
		this.count = this.$items.size();
		setCtWidth();
		this.currentItem = 1;
		this.isAnimate = false;
		this.clock = 0;

		setBg();
		this.autoPlay();
        this.bulletEvent();


		function addItems(){
			var $items = me.$ct.children();
			me.$ct.append($items.first().clone());
			me.$ct.prepend($items.last().clone());
		}
		function setCtWidth() {
			me.$ct.css({
				width:me.count * me.itemWidth,
				left: - me.itemWidth
			});
			me.$items.css({
				width:me.itemWidth
			});
			me.$ct.parent().css({
				width:me.itemWidth,
				height:me.itemHeight
			});
		}
		function setBg(){
			me.$items.each(function(index,el){
				var $node = $(el);
				if (!$node.data("isLoad")) {
					var imgUrl = $node.attr("data-img");
					$node.css('background-image','url(' + imgUrl + ')');
					$node.data("isLoad",true);
				}
			});
		}
	}


	Carousel.prototype.play = function (index){
		var me = this;
		if (this.isAnimate) return ;
		this.isAnimate = true;

		this.$ct.animate({left:-index*this.itemWidth},500,function(){

            if (index == me.count-1){                           //playNext()到最后一个 实际是轮播的第一张图
                me.$ct.css('left',-me.itemWidth);               //切换到第一张图的位置
                index = 1;                                      //当前位置 设为 一
            }
            if (index == 0) {                                   //playPre()到第0个 实际是轮播的最后一张图
                me.$ct.css('left',-me.itemWidth*(me.count-2));  //切换到倒数第二张图的位置，即轮播的最后一张图
                index = me.count-2;
            }
			me.isAnimate = false;
			me.currentItem = index;

            setBullet(index-1);
		});
		function setBullet(index){
			me.$bullet.children().removeClass('active').eq(index).addClass('active');
		}
	};
	Carousel.prototype.playNext = function (){
		this.play((this.currentItem + 1) % this.count);
	};
	Carousel.prototype.playPre = function (){
		this.play((this.currentItem - 1 + this.count) % this.count);
	};
	Carousel.prototype.autoPlay = function (){
		var me = this;
		this.clock = setInterval(function(){
			me.playNext();
		},3000);
	};
	Carousel.prototype.stopAuto = function (){
        this.clock && clearInterval(this.clock);
    };
    Carousel.prototype.bulletEvent = function (){
        var me = this;
        this.$bullet.on('click','li',function(e){
            var $item = $(this);
            var index = $item.index();
            console.log(index);
            me.play(index+1);
        });
    };

	return Carousel;
});

/*
<div id="head" class="pos-relative">   		<!--显示图片的窗口--> <!--轮播图片的包裹容器 ul-->
    <ul class="ct clearfix">
        <li data-img = "img/bg1.jpg"></li>
        <li data-img = "img/bg2.jpg"></li>
        <li data-img = "img/bg3.jpg"></li>
        <li data-img = "img/bg4.jpg"></li>
    </ul>
    <ul class="bullet clearfix">
        <li class="active"></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
*/