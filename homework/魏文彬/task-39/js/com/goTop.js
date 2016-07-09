define(['jquery'],function($){

	function GoTop(){
		this.creatHtml();
		this.bind();
	};

	GoTop.prototype = {

		creatHtml: function(){
			this.$gotop = $('<div id="gotop"><span>Top</span></div>').hide();
			this.$gotop.css({
				position: 'fixed',
				right: '30px',
				bottom: '30px',
				textAlign: 'center',
				width: '50px',
				fontSize: '30px',
				backgroundColor: '#fed136',
				border: '1px solid #ccc',
				borderRadius: '50%',
				cursor: 'pointer',
				color:'#fff',
			});
			$('body').append(this.$gotop);
		},

		bind: function(){
			var _this=this;
			this.$gotop.on('click',function(){
				$('body').animate({scrollTop:0},500);
			});
			$(window).on('scroll',function(){
				_this.checkShow();
			})
		},

		checkShow: function(){
			var _this=this;
			if($(window).scrollTop()>100){
				_this.$gotop.show(400);
			}else _this.$gotop.hide(400);
		},
		
	};
	return GoTop;
})