	function goTop(){
		var cur=this;
		var $top=$("<span>TOP<span>");
		var c=$("<span></span>")
		var b=$("<span>回到顶部</span>")
		$top.css({
		"width":40+"px",
		"height":40+"px",
		"line-height": 40+"px",
		"border-radius": 40+"px",
		"font-size":16+"px",
		"font-weight": "bolder",
		"text-align": "center",
		"color":"white",
		"background":"#2ED3E8",
		"cursor": "pointer",
		"position":"fixed",
		"right":120+"px",
		"bottom":142+"px",
		'opacity': '0.5',
		'z-index': '9999',
		"display":"none"
		}).hover(
			function () {
			 $(this).css({'opacity':'0.8'});
			 b.show();
			 c.show();
		},function(){
			$(this).css({
				'opacity':'0.5',
			});
			b.hide();
				c.hide();
		}
		);
		c.css({
		"content":"",
		"border":"10px solid transparent",
		"border-right-color":"#bbb",
		"width":0,
		"position": "fixed",
		"right":110+"px",
		"bottom":155+"px",
		"display":"none"
		});
		b.css({
		"width":80+"px",
		"height":30+"px",
		"background":"#bbb",
		"border-radius": 5+"px",
		"position": "fixed",
		"right":30+"px",
		"bottom":150+"px",
		"color":"white",
		"font-size":14+"px",
		"font-family": "微软雅黑",
		"text-align": "center",
		"line-height": 30+"px",
		"display":"none"
		});
		$("body").append($top);
		$("body").append(b);
		$("body").append(c);
	

		
		$top.on("click",function(){
			$("body").animate({
				scrollTop:0}
			,1000)
		})

		
		
		$(window).on("scroll",function(){
			var scrollT=$(window).scrollTop();
			if(scrollT>400){
				$top.show();
			}
			if(scrollT<400){
				$top.hide();
			}
		})
	}