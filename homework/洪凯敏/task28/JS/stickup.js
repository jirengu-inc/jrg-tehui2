/**
 * 
 * @authors adam (you@example.org)
 * @date    2016-04-24 20:04:52
 * @version 1.0
 * @description  depend on JQ
 */

(function($){
	$.fn.extend({//还有一种写法是直接$.fn.functionName=...
		"stickup":function(zindx,handler){//虽然可以调整z-index的值，但是当存在多个元素的大小不一的时候，就要用到透明了，可以在回调函数中处理。。
			//当传入的只是一个函数的时候处理
			if(typeof zindx == 'function'){
				handler=zindx;
				zindx=99;
			}

			var $cur=this,
				curH=$cur.height(),
				curW=$cur.width(),
				offsetTop=$cur.offset().top,
				offsetLeft=$cur.offset().left,
				//这边设置的是回调函数
				onChange =handler || function(){},
				zIndex=zindx || 99;
			//克隆一个当前的元素，防止导航栏在fixed的时候文档流结构变化
			var $div = $cur.clone()//
						.css("opacity",0)
						.insertBefore($cur)
						.hide();

			$(window).on("scroll",function(){
				var scrollTop =$(this).scrollTop();
				//判断滚动条的距离是不是大于原元素到body顶部的距离
				// console.log("scrollTop="+scrollTop);
				// console.log("offsetTop="+offsetTop);
				if(scrollTop >= offsetTop){
					if(!isFixed()){
						console.log("111");
						setFixed();
						onChange.call($cur);//用call或者apply来设置作用域
					}
				}else{
					if(isFixed()){
						unsetFixed();
					}
				}
				//console.log(isFixed());
			});

			function isFixed(){
				if($cur.attr('data-fixed')==='unfixed'){
					return false;
				}else{
					return true;
				}
				//return !!$cur.attr('data-fixed');
			}

			function setFixed(){
				$cur.attr('data-fixed','fixed')//尽力减少true和false这种非字符串的作为值名
					.css({
						position:'fixed',
						top:0,
						left:offsetLeft,
						'z-index':zIndex,
						width:curW,
						height:curH,
						margin:"0px"
					});
				$div.show();
			}

			function unsetFixed(){
				$cur.attr('data-fixed','unfixed')
					.removeAttr('style');
				$div.hide();
			}

		}
	});
})(jQuery);//块级作用域,为了防止$变量被占用,还有变量的重名