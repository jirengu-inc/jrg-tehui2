var goTop={
     init: function(){
     	if($('.goTop').length>0) return;
     	var $goTop=$('<div class="goTop" href="#">Top</div>')
     	$('.wrap').append($goTop);

     	this.$goTop=$goTop;
     	this.bind();
     	this.render();
     },

     bind:function(){
     	var me=this;
     	$(window).on('scroll',function(e){
     		var offsetTop =$(window).scrollTop();
     		if(offsetTop>400){
     			me.$goTop.show(400);
     		}else{
     			me.$goTop.hidden(400);
     		}
     	});
     	this.$goTop.on('click',function(){
     		$(window).scrollTop(0);
     	});
     },


     render:function(){
     	var self=this;
     	self.$goTop.css({
     		'display':'none',
     		'position':'fixed',
     		'width':'60px',
     		'height':'60px',
     		'text-align':'center',
     		'line-height':'60px',
     		'right':'5%',
     		'top':'85%',
               'border-radius':'50%',
               'cursor':'pointer',
     		'background-color':'rgba(52,52,52,0.4)',
     		'z-index':'9'
     	})
     }


};