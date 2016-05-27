/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-26 22:07:23
 * @version $Id$
 */

// 要求：html 里有多个carousel，当调用时启动全部的 carousel

(function($){


	var Carousel=function($ct){
			this.$ct=$ct;
			this.$imgs=this.$ct.find(".img-list");
			this.$left=this.$ct.find(".btn-left");
			this.$right=this.$ct.find(".btn-right");
			this.$nav=this.$ct.find(".bottom-nav");
			this.shift=this.$imgs.find("li").width();
			this.curindx=0;//初始化当前选择的图片
			this.isAnimate=false;//重复按钮锁
			//初始化
			this.init();
			this.bind();

	}

	Carousel.prototype.init=function(){
			//设置底部导航水平居中
			this.$navWidth=this.$nav.width();
			var setMargin="-"+(this.$navWidth/2)+"px";
			this.$nav.css("margin-left",setMargin);

			//设置img水平排列
			var imgsWidth=this.shift*(this.$imgs.find("li").size()+2);
			this.$imgs.css("width",imgsWidth+"px");

			//clone首尾节点
			var $head=this.$imgs.find("li").first().clone();
			var $tail=this.$imgs.find("li").last().clone();
			this.$imgs.prepend($tail);
			this.$imgs.append($head);
	}

	Carousel.prototype.changeColor=function(index){
			//随着滚动变色的底部导航栏函数
			this.$nav.find("li").eq(index).find("a").addClass("active");
			this.$nav.find("li").eq(index).siblings().find("a").removeClass("active");
	}

	Carousel.prototype.nextImg=function(){
			//设置跳转到下一个图片的函数
			var _this=this;
			if(this.isAnimate) return;
			this.isAnimate=true;
			++this.curindx;
			var leftValue=this.curindx*this.shift;//计算要偏移的距离
			this.$imgs.animate({
				left:"-"+leftValue+"px"
			},function(){
				_this.isAnimate=false;
				if(_this.curindx==6){
					_this.$imgs.css("left","-"+_this.shift+"px");
					_this.curindx=1;

				}
				_this.changeColor(_this.curindx-1);
			});
	}

	Carousel.prototype.prevImg=function(){

			if(this.isAnimate) return;
			var _this=this;
			this.isAnimate=true;
			--this.curindx;
			//curindx=curindx+$imgs.children().size();
			var leftValue=this.curindx*this.shift;//计算要偏移的距离
			this.$imgs.animate({
				left:"-"+leftValue+"px"
			},function(){
				_this.isAnimate=false;
				if(_this.curindx==0){
					_this.curindx=_this.$imgs.children().size()-2;
					_this.$imgs.css("left","-"+(_this.shift*_this.curindx)+"px");
				}
				_this.changeColor(_this.curindx-1);
			});
	}		//设置上一个的函数

	Carousel.prototype.skip=function(index){
		var _this=this;
		if(this.isAnimate||index>this.$imgs.children().size()-2||this.index<1) return;
		this.isAnimate=true;
		this.curindx=index||1;
		var leftValue=this.curindx*this.shift;
		this.$imgs.animate({
			left:"-"+leftValue+"px"
		},function(){
			_this.isAnimate=false;
		});
	}

	Carousel.prototype.bind=function(){
		var _this=this;
		//设置右键触发事件
		function nextImg(){
			_this.nextImg.call(_this);
		}
		function prevImg(){
			_this.prevImg.call(_this);
		}
		this.$right.on("click",nextImg);
		this.$right.on("mouseenter",function(){
			clearInterval(stopv);
		}).on("mouseleave",function(){
			stopv=setInterval(nextImg,1000);
		});
		//设置左键触发事件
		this.$left.on("click",prevImg);
		this.$left.on("mouseenter",function(){
			clearInterval(stopv);
		}).on("mouseleave",function(){
			stopv=setInterval(nextImg,1000);
		});
		//自动轮播
		var stopv=setInterval(nextImg,1000);
		//设置底层导航栏的点击事件
		this.$nav.on("click","li",function(){
			var $this=$(this);
			_this.changeColor.call(_this,$this.index());
			_this.skip.call(_this,$this.index()+1);
		});
	}
	



	$.fn.carousel=function(){
		console.log("carousel");
		console.log($(this));
		if(this.length>1){

			for(var i=0;i<this.length;i++){
				new Carousel(this.eq(i));
			}
		}else{
			new Carousel(this);
		}

	};

})(jQuery);








//方式1
//通过插件的方式启动所有轮播
// $('.carousel').carousel();
// console.log($('.carousel'));

//方式2
//通过创建对象的方式启动所有轮播
// $('.carousel').each(function(){
//     new Carousel($(this));
// });