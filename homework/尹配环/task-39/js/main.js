requirejs.config({
	baseUrl:'js',
	paths:{
		jquery:'lib/jquery'
	}
});

requirejs(['jquery','app/Carousel','app/StickUp','app/weaterfallAll','app/Exposure','app/GoTop'],
	function($,Carousel,StickUp,weaterfallAll,Exposure,GoTop){
		new Carousel($('#head>.ct'));
		new StickUp($('#nav'));
		weaterfallAll();
		new Exposure($('#about ul>li'));
		new GoTop();
	}
);

