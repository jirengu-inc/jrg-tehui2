define(['jquery'],function($){	

	function Exposure($node){
		this.init($node);
		this.bind();
	}

	Exposure.prototype.init=function($node){
		this.winH=$(window).height();
		this.$node=$node;
		$node.css("opacity",0);
	}

	Exposure.prototype.isVisibility=function(){
		var offsetTop=this.$node.offset().top;
		var scrollTop=$(window).scrollTop();

		return this.winH+scrollTop>offsetTop;
	}

	Exposure.prototype.bind=function(){
		var _this=this;
		$(window).on("scroll",function(){
			if(_this.$node.data("isShow") === "show"){
				return;
			}
			if(_this.isVisibility()){
				_this.$node.data("isShow","show");
				_this.$node.animate({
					opacity:1
				},1500);
			}
		});
	}

	return Exposure;
});