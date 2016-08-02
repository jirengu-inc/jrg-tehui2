define(['jquery'],function($){
		function Gotop($node,top){
			this.$node = $node;
			this.breakTop = top;
			this.init()
		}
	Gotop.prototype.init = function(){
		this.$node.css('visibility','hidden')
		this.bindEvents()
	}	
	Gotop.prototype.bindEvents = function(){
		var me = this;
		$(window).on('scroll',function(){
			if($(window).scrollTop() > me.breakTop) {
				me.$node.css('visibility','visible')
			}else{
				me.$node.css('visibility','hidden')
			}
		})
		me.$node.on('click',function(){
			$('body').animate({'scrollTop':0},500)
		})
	}
	return $.fn.gotop = function(top){
		var top = top||200;
		var gotop = new Gotop($(this),top)
	}
})
