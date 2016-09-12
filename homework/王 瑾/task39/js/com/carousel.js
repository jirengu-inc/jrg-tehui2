define(["jquery"],function($){
	function Carousel($el){
		this.box = $el;
		this.init();
	}
	
	Carousel.prototype.init = function setCarousel(){
		this.juniorBox = this.box.find(".img-ct");
		var oWidth = $("body").width(),
		    $imgs = this.juniorBox.children(),
		    count = $imgs.length;
		this.juniorBox.append($imgs.first().clone())
		              .prepend($imgs.last().clone());
		var realCount = this.juniorBox.children().length;
		this.juniorBox.css({
			"left":0-oWidth,
			"width":realCount*oWidth
		});
		this.juniorBox.find("li").css("width",oWidth); //在css中li的宽度继承自父类，所以这里也需要重设
		this.count = count;  //图片数量
		this.curIdx = 0;
		this.oWidth = oWidth;
		this.status = "unlocked";
		this.bind();
	};
	
	Carousel.prototype.bind = function bindEvent(){
		var that = this;
		var l = that.count,
		    $pre = that.box.find(".pre"),
		    $next = that.box.find(".next"),
		    $bullet = that.box.find(".bullet").children();
		$pre.on("click",function(){
			playPre(1);
		});
		$next.on("click",function(){
			playNext(1);
		});
		$bullet.on("click",function(){
			var idx = $(this).index();
			if(idx>that.curIdx){
				playNext(idx-that.curIdx);
			}else if(idx<that.curIdx){
				playPre(that.curIdx-idx);
			}
		});
		
		function playPre(idx){
			if(that.status==="locked") return;
			that.status = "locked";
			that.juniorBox.animate({
				"left":"+="+that.oWidth
			},function(){
				that.curIdx = (that.curIdx-idx+l)%l;
				if(that.curIdx===l-1){
					that.juniorBox.css("left",0-l*that.oWidth);
					that.curIdx = l-1;
				}
				setBullet();
				that.status = "unlocked";
			});
		}
		
		playAuto();
		
		function playNext(idx){
			if(that.status==="locked") return;
			that.status = "locked";
			that.juniorBox.animate({
				"left":"-="+idx*that.oWidth
			},function(){
				that.curIdx = (that.curIdx+idx)%l;
				if(that.curIdx===0){
					that.juniorBox.css("left",0-that.oWidth);
					that.curIdx = 0;
				}
				setBullet();
				that.status = "unlocked";
			});
		}
		
		function playAuto(){
			var clock = setInterval(function(){
				playNext(1);
			},2500);
		}
		
		function setBullet(){
			$bullet.removeClass("active").eq(that.curIdx).addClass("active");
		}
		
	};
	
	//也可以通过exports属性向外提供接口
	return Carousel;
});