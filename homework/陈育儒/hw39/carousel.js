/*
 * 轮播插件使用方法。
 * {
 *   arrowCtrl:[true,'btn-prev','btn-next'],
 *   //左右控制   0:需要   1:左按钮Class  2:右按钮class    元素是a标签  
 *   bulletsCtrl:[true,'bullet']}
 *   //菜单控制    0:需要    1:菜单按钮样式样式            元素是ul,li标签
 * }
 *
 * 目前的功能：
 * 缺陷(无法设定轮播的宽度,里面直接获取)
 * 1.每隔一段时间播放下一张，不断循环。
 * 2.控制单元：左右翻页，以及点击下面的菜单，可以跳转到指定的那张。
 * 3.控制单元(可选)已经有了,但必须先在页面上调整好，之后放入样式即可。
 * 
 * 控制单元需要设置：position:absolute 
 * 需要手动调整控制单元在页面的样式在把class添加进来
 * 宽度无法设定，直接获取。
 * 
 *
 * 
 */
 function Carousel(node){
 	this.$wrap = $(node);//获取节点，父节点
 	this.$items = this.$wrap.children();//原本的子节点(因为需要克隆，先存起来)
 	this.itemsCount = this.$wrap.children().length;//原本的节点的个数
	this.width = this.$wrap.width();//获取窗口宽度
	this.curIdx = 1;//播放第1张,因为克隆了
	this.playing = false;//状态锁，防止重复点击
	this.clock;//自动播放的定时器setInterval

}
 Carousel.prototype = {
 	init:function(opts){
 		this.buildFirst();//1.建立克隆的节点，设置轮播开始前的样式，就是前后个拷贝一个DOM的轮播
 		this.autoPlay();//2.自动播放
 		this.createCtrlElements(opts);//3.创建控制单元的元素
 		this.bindEvents(opts);//4.给控制元素绑定事件
 	},
 	buildFirst:function(){
 		var last = this.$items.last().clone();
 		var first = this.$items.first().clone();
 		this.$wrap.append(first);
 		this.$wrap.prepend(last);
 		this.$itemsRealCount = this.$wrap.children();//实际的个数，克隆后的个数
 		var me = this;
 		this.$itemsRealCount.each(function(){$(this).css('width',me.width);});//设置容器的每个节点的宽度,无法设定,直接获取
 		me.$wrap.css({width:me.$itemsRealCount.length*me.width,left:-me.width});//设置容器的宽度以及开始left距离
 	},
 	createCtrlElements:function(opts){
 		var bulletsArr = [];
 		var i;
 		bulletsArr.push('<ul>');
 		if(opts.bulletsCtrl[0]){
 			for(i=0;i<this.itemsCount;i++){
 				bulletsArr.push('<li></li>');
 			}
	 		bulletsArr.push('</ul>');
	 		this.$bullets= $(bulletsArr.join(''));//放入bullet菜单的节点并保存到this属性
	 		this.$wrap.parent().append(this.$bullets);//插入到容器中
	 		this.$bullets.addClass(opts.bulletsCtrl[1]);//添加样式
 		}

 		if(opts.arrowCtrl[0]){
 			this.$btnPrev = $('<a href="javascript:"><</a>');
 			this.$btnNext = $('<a href="javascript:">></a>');
 			this.$btnPrev.appendTo(this.$wrap.parent())
 								.addClass(opts.arrowCtrl[1]);//设置左翻页按钮样式
 			this.$btnNext.appendTo(this.$wrap.parent())
 								.addClass(opts.arrowCtrl[2]);//设置右翻页按钮样式
 		}

 	},
 	bindEvents:function(opts){
 		var me = this;
 		me.againClock;//当停止播放后，播放一张，之后定时一个时间再开始自动播放的定时器setTimeout
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
 		var me = this;
 		var maxNum = me.$itemsRealCount.length - 1;//实际的个数(包含克隆的)
 		var intvNum;//目标和当前相差的个数
 		if(this.playing){return;}
 		this.playing = true;
 		if( this.curIdx < idx ){
 			intvNum = idx - this.curIdx;
 			left = intvNum*me.width;//获取相隔的距离
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
 			left =  Math.abs(intvNum*this.width);//获取相隔的距离
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
 		//待完成
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
 			//停顿一段时间后重新播放
 			clearTimeout(me.againClock);
 			me.againClock = setTimeout(function(){
 				me.autoPlay();
 			},2000)
 		}
 }

 var node = $('#first-page .carousel');
 var a = new Carousel(node);
 a.init({arrowCtrl:[true,'btn-prev','btn-next'],bulletsCtrl:[true,'bullet']});
