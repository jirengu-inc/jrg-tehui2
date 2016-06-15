/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-22 20:11:15
 * @version $Id$
 */

requirejs.config({
	base: "./js",
	paths: {
		'jquery': 'lib/jquery'
	}
});

require(['jquery','com/carousel','com/waterfall','com/exposure','com/goTop'],function($,Carousel,Waterfall,Exposure,Gotop){
	//首页轮播
	var $top=$(".top-ct-full");
	new Carousel($top);

	//曝光加载

	var expCt=$(".exposure-ct");

	$.each(expCt.find("li"),function(){
		var $this=$(this);
		new Exposure($this);
	});

	//返回顶部按钮
	//参数是给该按钮的css
	new Gotop("gotop");

	//图片瀑布流
	var $ct=$("#waterfall-ct"); 
	var waterfall=new Waterfall($ct);
	waterfall.$btn.on("click",function(){
		var url="php/loadmore.php";
		var str="";
		function success(req){
			req=JSON.parse(req);
			//组装字符串
			//<li>
			//<a href="#"><img src="img/roundicons.png" alt="roundicons.png"></a>
			//<h4>Round Icons</h4>
			//<p>Graphic Design</p>
			//</li>
			for (var i=0;i<req.data.length;i++){
				 str=str+"<li>"
				   +"<a href='#'><img src='"
				   +req.data[i]
				   +".jpg'"
				   +"></a>"
				   +"<h4>Round Icons</h4>"
				   +"<p>Graphic Design</p>"
				   +"</li>";
			}
			waterfall.addNode(str);	
		}	
		waterfall.request(url,success);
	});
	waterfall.$btn.trigger("click");


});