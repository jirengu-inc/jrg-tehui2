require.config({
	baseUrl:"./js",
	paths:{
		"jquery":"lib/jquery-3.0.0.min",
		"carousel":"com/carousel",
		"gotop":"com/gotop",
		"exposure":"com/exposure",
		"waterfall":"com/waterfall"
	}
});

require(["jquery","carousel","gotop","waterfall","exposure"],function($,Carousel,Gotop,Waterfall,Exposure){
	$("a").on("click",function(e){
		e.preventDefault();
	});
	
	new Carousel($("#carousel")); // 轮播
	Gotop();                      // 回到顶部
	new Waterfall($(".wf-ct"));   //瀑布流
	
	new Exposure($(".timeline li"));  //渐变曝光
	new Exposure($(".timeline-cover"));
	new Exposure($(".timeline-end"));
});