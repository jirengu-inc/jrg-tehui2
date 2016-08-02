requirejs.config({
    baseUrl: 'js/app',
    paths: {
 		'jquery':'../lib/jquery'
    }
})
require(['jquery','carousel','exposure','waterfall','backtop'],function($,Carousel,Exposure,Waterfall,Gotop){

//轮播
 var node = $('#first-page .carousel');
 new Carousel(node,{'arrowCtrl':[true,'btn-prev','btn-next'],'bulletsCtrl':[true,'bullet','active']});

//曝光显示
	var $list = $('#timeline .time-item li');
	$list.each(function(){
		new Exposure($(this))
	});

//回到顶部
 $backtop = $('.backtop');
 $backtop.gotop()


	var $load = $('#loadmore');

	var $ct = $('#portfolio ul'),
		 $items = $ct.children(),
		 perPageCount = 6,curPage = 1,loadRenderData = false;

	var water = new Waterfall($ct,$items);//里面预先放了几个图片先建立瀑布流
		 water.render()//启动瀑布流

	function getRenderData(){
		if(loadRenderData){return}
			loadRenderData = true;
		 $.ajax({
		  	 	url:'http://platform.sina.com.cn/slide/album_tech',
		  	 	dataType:'jsonp',
		  	 	jsonp:'jsoncallback',
		  	 	data:{
		  	 		app_key:'1271687855',
		  	 		num:perPageCount,
		  	 		page:curPage
		  	 	},
		  	 	success:function(res){
		  	 		if(res.status.code === '0'){
		  	 			loadRenderData = false;
		  	 			onSuccess(res.data);//成功得到数据
		  	 		}
		  	 	}
		  	 })
	}
	function tmplTojQElem(data){
	  	var tpl = "";
	  	var $nodes;
	  	for(var i=0;i<data.length;i++){
	  		tpl += '<li>'+'<a href="'+data[i].url+'">'+'<img src="'+data[i].img_url+'">'+'</a>';
	  		tpl += '<h4>'+data[i].short_name+'</h4>';
	  		tpl += '<p>'+data[i].short_intro+'</p>';
	  		tpl += '</li>';
	  	}
	  	$nodes = $(tpl);
	  	return $nodes;//返回数据
	}
	function onSuccess(ret){

		 var $nodes = tmplTojQElem(ret), defereds = []; 
	    $nodes.find('img').each(function () {
	    var defer = $.Deferred();
	    $(this).load(function() {
	    	defer.resolve();
	    });
	    defereds.push(defer);
      });

	   $.when.apply(null,defereds).done(function() { 
			water.render($nodes);//之前建立了瀑布流对象，在这个基础上渲染
		});
	}
	$load.on('click',function(){
		getRenderData();
	})

})