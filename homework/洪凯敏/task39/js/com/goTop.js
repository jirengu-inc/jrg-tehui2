define(["jquery"],function($){

	function Gotop(className){
		this.init(className);
		this.bind();
	}

	Gotop.prototype.init=function(className){
		this.winH=$(window).height();
		this.$btn=$("<div>Top</div>");
		this.$btnClassName=className;
		this.$btn.addClass(className);
		this.jumpTop=this.winH*1.5;
		$("body").append(this.$btn);
		if(this.isShow()){
			this.$btn.show();
		}else{
			this.$btn.hide();
		}
	}

	Gotop.prototype.isShow=function(){

		return $(window).scrollTop()>this.jumpTop;
	}

	Gotop.prototype.bind=function(){
		var _this=this;
		this.$btn.on('click',function(){
			$(window).scrollTop(0);
		});
		$(window).on("scroll",function(){
			if(_this.isShow()){
				_this.$btn.show();
			}else{
				_this.$btn.hide();
			}
		});
	}



	return Gotop;
});