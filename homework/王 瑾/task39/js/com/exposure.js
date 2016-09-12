define(["jquery"],function(){
	function Exposure($el){
		this.init($el);
		this.obj = $el;
	}
	
	Exposure.prototype.init = function setExposure(el){
		this.winH = $(window).height();
		this.offH = el.offset().top;
		this.bind();
	};
	
	Exposure.prototype.bind = function(){
		var that = this;
		$(window).on("scroll",function(){
			var scrollH = $(window).scrollTop();
			if(that.offH < that.winH+scrollH){
				that.obj.animate({
					"opacity":1
				},1200);
			}
		});
	};
	return Exposure;
});