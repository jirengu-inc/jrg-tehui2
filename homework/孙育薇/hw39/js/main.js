requirejs.config({
	base: "./js",
	paths: {
		'jquery': 'lib/jquery'
	}
});

require(['jquery','com/gotop', 'com/waterfall', 'com/carousel', 'com/exposure', 'com/jumpto'], function($, GoTop, Waterfall, Carousel, Exposure, JumpTo){
		new GoTop($("#footer"));

		var banner = new Carousel($("#banner"));
		banner.init();
		banner.enableDotNav();

		var wf = new Waterfall($("#portfolio .works"), 360, 5);
		wf.init();

		$(".timeline li").each(function() {
			new Exposure($(this), 3/4);
		});

	new JumpTo($("a.btn"));
	//点击nav中的li转到相应的区块,样式,动画重现DEMO
	new JumpTo($(".nav a"));
	//点击logo用动画回到顶部,重现DEMO
	new JumpTo($("#logo a"));
	
	$(window).on("scroll", function() {
		//还原DEMO导航栏效果
		if ($(window).scrollTop() > 200) {
			$("#header").css("backgroundColor", "#222222");
			$("#logo a").css("fontSize", "20px");
		} else {
			$("#header").css("backgroundColor", "transparent");
			$("#logo a").css("fontSize", "28px");
		}

		//滚动到某区块时相应的导航条项目高亮
		$(".nav li").each(function(index) {
			var thisTarget = $(this).find("a").attr("href");
			if(index < $(".nav li").size() - 1){
				var nextTarget = $(".nav li").eq(index+1).find("a").attr("href");
				if ($(window).scrollTop() > $(thisTarget).offset().top - 20
				&& $(window).scrollTop() < $(nextTarget).offset().top) {
					$(".nav li").removeClass("active");
					$(this).addClass("active");
				} else if ($(window).scrollTop() < $(thisTarget).offset().top) {
					$(this).removeClass("active");
				}
			} else {
				if ($(window).scrollTop() > $(thisTarget).offset().top - 20) {
					$(".nav li").removeClass("active");
					$(this).addClass("active");
				}
			}
		});
	});

	//TODO: form区域的功能实现
	$("#c-submit").on("click",function(e) {
		e.preventDefault();
		var msg = '<p class="msg">This function is currently not available.</p>';
		$(msg).insertBefore($(this));
	})
});

//TODO: 点击Portfolio 出现每个的介绍块,重现DEMO样式