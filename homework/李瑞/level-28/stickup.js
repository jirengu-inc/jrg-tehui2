
	$.fn.stick=function(){
	var $cur=this,
	curH=$cur.height(),
	curW=$cur.width(),
	offTop=$cur.offset().top,
	offLeft=$cur.offset().left;

	var newCur=$cur.clone().css("opacity",0).insertBefore($cur).hide();

	$(window).on("scroll",function(){
		var scrollTop=$(this).scrollTop();
		if(scrollTop>=offTop){
			if(!isFixed()){
				setFixed();
				console.log("我已经固定啦");
			}
		}else if(isFixed()){
				unsetFixed();
				console.log("松绑啦");
		}
	});
	function isFixed(){
		return !!$cur.attr("data-fixed");
	}
	function setFixed(){
			$cur.attr("data-fixed",true);
			$cur.css({
			"position":"fixed",
			"left":offLeft,
			"top":0,
			"width":curW,
			"height":curH,
			"z-index":10,
			"margin":0
			});
			newCur.show();
	}
	function unsetFixed(){
			$cur.removeAttr("style");
			$cur.removeAttr("data-fixed");
			newCur.hide();
	}
}
		console.log("加载完成")

		
