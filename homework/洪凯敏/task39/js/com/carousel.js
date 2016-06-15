/* 该组件仅仅适用于<ul><li></li><li></li></ul>这样的形式的轮播
*
*
*/

define(["jquery"],function($){

	var Carousel=function($node){
		this.init($node);
		this.autoPlay();
	};
	//绑定需要操作的DOM元素
	//这边使用淡入淡出的轮播,当然也可以使用无缝轮播
	Carousel.prototype.init=function($node){
		this.curIndex=0;//得到当前的指向的图片
		this.$items=$node.find("li");
		this.length=this.$items.length;
		//初始化的时候把第一张图给展示,其他隐藏
		this.$items.hide();
		this.$items.eq(this.curIndex).show();
		this.clock=null;//这个设置是否自动播放
		this.showSpeed=500;
		this.cutSpeed=2000;
	}

	//主要修正curIndex的问题
	Carousel.prototype.playNext=function(callback){
		this.curIndex=this.curIndex+1;
		this.curIndex=this.curIndex%this.length;
		//得到li上的data-url属性
		var url=this.$items.eq(this.curIndex).attr("data-url");
		this.setImg(this.curIndex,url);
		this.skip(this.curIndex,callback);

	}

	Carousel.prototype.playPre=function(callback){
		this.curIndex=this.curIndex-1;
		this.curIndex=(this.curIndex+this.length)%this.length;
		var url=this.$items.eq(this.curIndex).attr("data-url");
		this.setImg(this.curIndex,url);
		this.skip(this.curIndex,callback);
	}

	Carousel.prototype.skip=function(index,callback){
		//弄个回调函数,方便自定义和扩展.
		callback=callback || function(){};
		if(index<0 || index>this.length){
			console.error("index argument is illegal!");
			return;
		}
		this.$items.fadeOut(this.showSpeed);
		this.$items.eq(index).fadeIn(this.showSpeed,callback);
	}
	//负责加载图片
	Carousel.prototype.setImg=function(index,url){
		var $item=this.$items.eq(index)
		if ($item.data("setImg")==="set"){
			return;
		}
		$item.css("background-image", "url("+ url +")");
		$item.data("setImg","set");


	}

	Carousel.prototype.autoPlay=function(){
		var _this=this;
		this.clock=setInterval(function(){
			_this.playNext();
		},this.cutSpeed);
	}

	Carousel.prototype.stopPlay=function(){
		if(this.clock){
			clearInterval(this.clock);
		};
	}


	//暴露外部的接口
	return Carousel;
});