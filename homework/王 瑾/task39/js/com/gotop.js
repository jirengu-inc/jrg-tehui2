define(["jquery"],function($){
	    function gotop(){
		this.goTop = $("<div id='gotop'>回到顶部</div>");
	    if($("#gotop").length>0) return;
	    $("body").append(this.goTop);
	    $(window).on("scroll",function(){
	    	var scrollH = $(window).scrollTop();
	    	if(scrollH>100){
	    		this.goTop.show();
	    	}else{
	    		this.goTop.hide();
	    	}
	    });
	    this.goTop.on("click",function(){
	    	$(window).scrollTop(0);
	    });
	}
	    return gotop;
});