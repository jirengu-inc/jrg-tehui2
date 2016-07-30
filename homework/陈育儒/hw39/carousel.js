/*
 *
 * 
 */
 function Carousel(node,options){

 	this.$viewPort = $(node);//装图片的容器
 	this.opts = options;//选项
 	this.ViewWidth = this.$viewPort.width();//可视内容的窗口宽度
 	this.$items = this.$viewPort.children();//图片的元素
 	this.itemsCount = this.$items.length;//图片的个数
 	this.curIdx = 1;//因为克隆了项目,需要设置为1
 	this.timer = null;//自动播放定时器
 	this.playing = false;//动画锁定状态锁,防止重复点击
 	// this.opts = options;

}
 Carousel.prototype = {
 	init:function(){

 		this.cloneAndSetViewCss();
 		this.createCtrlDom();
 		this.ctrlDomAddClass()
 		this.bindEvents();
 		this.autoPlay()

 	},
 	cloneAndSetViewCss:function(){

 		var me = this;
 		this.$items.each(function(){
 			$(this).css('width',me.ViewWidth);//先为展示的图片设置宽度
 		});

 		this.$viewPort.append(this.$items.first().clone());
 		this.$viewPort.prepend(this.$items.last().clone());

 		this.itemsRealCount = this.itemsCount + 2;
 		this.$viewPort.css({width:me.ViewWidth * this.itemsRealCount,left:-me.ViewWidth})
 	},
 	createCtrlDom:function(){

 		var navArr = [];
 		var viewPortParent = this.$viewPort.parent();

 		this.$btnPrev = $('<a href="javascript:"><</a>');
 		this.$btnNext = $('<a href="javascript:">></a>');

 		viewPortParent.append(this.$btnPrev);
 		viewPortParent.append(this.$btnNext);

 		navArr.push('<ul>')
		for(var i=0;i<this.itemsCount;i++) {
			navArr.push('<li></li>')
		}
		navArr.push('</ul>')

		$navCt = $(navArr.join(''));
		viewPortParent.append($navCt);
		this.$navDot = $navCt.children();

 	},
 	ctrlDomAddClass:function(){

 		this.$btnPrev.addClass(this.opts.arrowCtrl[1])
		this.$btnNext.addClass(this.opts.arrowCtrl[2])
		this.$navDot.parent().addClass(this.opts.bulletsCtrl[1])
					   .children().eq(0).addClass(this.opts.bulletsCtrl[2])

 	},
 	bindEvents:function(){

 		var me = this;

 		this.$btnNext.on('click',function(){
 			me.playNext(1)
 		})

 		this.$btnPrev.on('click',function(){
 			me.playPrev(1)
 		})

 		this.$navDot.on('click',function(){
 			
 			var targetIdx = $(this).index() + 1;
 			var index;
 			if(targetIdx > me.curIdx) {
 				index = targetIdx - me.curIdx;
 				me.playNext(index);
 			}
 			if(targetIdx < me.curIdx) {
 				index = me.curIdx - targetIdx;
 				me.playPrev(index);
 			}
 		})
 	},
 	trackNavDot:function(){

 		var active = this.opts.bulletsCtrl[2];
 		this.$navDot.eq(this.curIdx - 1).siblings().removeClass(active)
 		this.$navDot.eq(this.curIdx - 1).addClass(active);

 	},
 	playNext:function(index){

 		if(this.playing){return}
 		this.playing = true;
 		var me = this;
 		this.$viewPort.animate({left:'-='+index*this.ViewWidth},function(){
 			me.curIdx = me.curIdx + index;
 		
 			if(me.curIdx === me.itemsRealCount - 1){
 				me.$viewPort.css('left',-me.ViewWidth);
 				me.curIdx = 1;
 			}

 			me.playing = false;
 			me.trackNavDot()
 		});

 	},
 	playPrev:function(index){
 		if(this.playing){return}
 		this.playing = true;
 		var me = this;
 		this.$viewPort.animate({left:'+='+index*this.ViewWidth},function(){

 			me.curIdx = me.curIdx - index;

 			if(me.curIdx === 0) {
 				me.$viewPort.css('left',-me.ViewWidth * me.itemsCount)
 				me.curIdx = me.itemsCount;
 			}

 			me.playing = false;
 			me.trackNavDot()

 		});
 	},
 	autoPlay:function(){
 		
 		var me = this;
 		this.timer = setInterval(function(){
 			me.playNext(1);
 		},1500);
 	}
 }

 var node = $('#first-page .carousel');
 var a = new Carousel(node,{'arrowCtrl':[true,'btn-prev','btn-next'],'bulletsCtrl':[true,'bullet','active']});
 a.init();
