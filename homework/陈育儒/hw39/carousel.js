/*
 * 轮播插件使用方法。
 * {
 *   arrowCtrl:[true,'btn-prev','btn-next'],
 *   //左右控制   需要   左按钮    右按钮 元素是a标签
 *   bulletsCtrl:[true,'bullet']}
 *   //菜单控制    需要    菜单按钮样式   元素是ul,li标签
 * }
 * 基本样式:最外层容器需要添加relative,控制的元素需要添加absolute
 * 宽度无法设定，直接获取。
 * 间隔时间设定功能还完成，只有以上功能
 *
 * 
 */
 function Carousel(node){
 	this.$wrap = $(node);//获取节点，父节点
 	this.$items = this.$wrap.children();
 	this.itemsCount = this.$wrap.children().length;//需要展示的图片的个数
	this.width = this.$wrap.width();//获取窗口宽度
	this.curIdx = 1;//播放第1张
	this.playing = false;//状态锁，防止重复点击
	this.clock;

}
 Carousel.prototype = {
 	init:function(opts){
 		this.buildFirst();//1.把克隆的步骤，设置轮播开始前的样式
 		this.autoPlay();
 		this.createCtrlElements(opts);
 		this.bindEvents(opts)
 	},
 	buildFirst:function(){
 		var last = this.$items.last().clone();
 		var first = this.$items.first().clone();
 		this.$wrap.append(first);
 		this.$wrap.prepend(last);
 		this.$itemsRealCount = this.$wrap.children();
 		var me = this;
 		this.$itemsRealCount.each(function(){$(this).css('width',me.width);});//设置容器的展示图片的宽度
 		me.$wrap.css({width:me.$itemsRealCount.length*me.width,left:-me.width});//设置容器的宽度以及开始left距离
 	},
 	createCtrlElements:function(opts){
 		var bulletsArr = [];
 		var bulletsTmpl = "";
 		var i;
 		bulletsArr.push('<ul>');
 		if(opts.bulletsCtrl[0]){
 			for(i=0;i<this.itemsCount;i++){
 				bulletsArr.push('<li></li>');
 			}
	 		bulletsArr.push('</ul>');
	 		this.$bullets= $(bulletsArr.join(''));
	 		this.$wrap.parent().append(this.$bullets);
	 		this.$bullets.addClass(opts.bullets).addClass(opts.bulletsCtrl[1]);
 		}

 		if(opts.arrowCtrl[0]){
 			this.$btnPrev = $('<a href="javascript:"><</a>');
 			this.$btnNext = $('<a href="javascript:">></a>');
 			this.$btnPrev.appendTo(this.$wrap.parent()).addClass(opts.arrowCtrl[1]);
 			this.$btnNext.appendTo(this.$wrap.parent()).addClass(opts.arrowCtrl[2]);
 		}

 	},
 	bindEvents:function(opts){
 		var me = this;
 		me.againClock;
 		if(opts.arrowCtrl[0]){

 			this.$btnPrev.on('click',function(){
 				if(me.playing){return}
 					me.stopAutoPlay()
 					me.playPrev();
 					me.startAutoPlay()
 			});
 			this.$btnNext.on('click',function(){
 				if(me.playing){return}
 					me.stopAutoPlay()
 					me.playNext();
 					me.startAutoPlay()
 			})
 		}
 		if(opts.bulletsCtrl[0]){
			this.$bullets.on('click','li',function(e){
				if(me.playing){return}
	 			var idx = $(e.target).index()+1;
	 			me.stopAutoPlay();
	 			me.play(idx);
	 			me.startAutoPlay();
 			})
 		}
 	},
 	play:function(idx){
 		var left = 0;
 		var nowLeft = this.$wrap.offset().left;
 		var me = this;
 		var maxNum = me.$itemsRealCount.length - 1;
 		var intvNum;
 		if(this.playing){return;}
 		this.playing = true;
 		if( this.curIdx < idx ){
 			intvNum = idx - this.curIdx;
 			left = intvNum*me.width;
 			this.$wrap.animate({left:'-='+left},function(){
 				me.curIdx = idx;
 				console.log(me.curIdx);
 				if(me.curIdx === maxNum ){
 					me.$wrap.css('left',-me.width)
 					me.curIdx = 1;
 				}
 				me.playing = false;
 			})
 		}
 		if( this.curIdx > idx ){
 			intvNum = this.curIdx - idx;
 			left =  Math.abs(intvNum*this.width);
 			this.$wrap.animate({left:'+='+left},function(){
 				me.curIdx = me.curIdx - intvNum;
 				if(me.curIdx === 0){
 					me.$wrap.css('left',-(maxNum -1)*me.width)
 					me.curIdx = maxNum-1;
 				}
 				me.playing = false;
 			})
 		}
 		
 	},
 	playNext:function(){
 		this.play(this.curIdx + 1)
 	},
 	playPrev:function(){
 		this.play(this.curIdx - 1)
 	},
	setBullet:function(){
 		
 	},
 	autoPlay:function(){
 		var me = this;
 		this.clock = setInterval(function(){me.playNext()},2000);
 	},
 	stopAutoPlay:function(){
 		clearInterval(this.clock)
 	},
 	startAutoPlay:function(){
 			var me = this;
 			clearTimeout(me.againClock);
 			me.againClock = setTimeout(function(){
 				me.autoPlay();
 			},2000)
 		}
 }

 var node = $('#first-page .carousel');
 var a = new Carousel(node);
 a.init({arrowCtrl:[true,'btn-prev','btn-next'],bulletsCtrl:[true,'bullet']});
