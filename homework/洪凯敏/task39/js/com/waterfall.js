/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-22 20:34:25
 * @version $Id$
 * 形式还是<ul><li><img></li><li><img></li></ul>
 */

define(['jquery'],function($){
	//通过给予的容器宽度和单个单位的宽度来获得数组长度.
	function Waterfall($ct){
		this.$ct=$ct;
		this.ctW=$ct.width();
		this.$items=$ct.find("li");
		this.itemW=380;
		this.counts=Math.floor(this.ctW/this.itemW);
		this.arr=[];//保存图片长度的数组
		this.reqamount=4;//每次请求的图片个数
		this.isReq=false;//请求锁
		this.page=0;
		//初始化的事件
		this.init();
		this.addbtn();
	}

	Waterfall.prototype.init=function(){
		var arr=[];//防止被this.arr
		for(var i=0;i<this.counts;i++){
			arr.push(0);
		}
		//这边针对task15中已经存在的元素做特别的处理,不太具有通用性
		if(this.$items && this.$items.length>0){
			for(var i=0;i<this.counts;i++){
				arr[i]=this.$ct.height();
			}
		}
		this.arr=arr;

	}
	Waterfall.prototype.addbtn=function(){
		str="<div class='btn'>load more</div>";
		var $btn=$(str);
		this.$btn=$btn;
		this.$ct.parent().append($btn);
	}
	//把要组装的节点加进容器中,这边就不懒加载了.
	Waterfall.prototype.addNode=function(str){
		var $nodes=$(str);
		var $imgs=$nodes.find("img");
		var _this=this;
		this.$ct.append($nodes);
		$imgs.on("load",function(){
			_this.layout($(this).parents("li"));
		});

	}

	Waterfall.prototype.request=function(url,success){
		if(this.isReq){return;}//重复锁
		this.isReq=true;
		this.$btn.text("loading...");
		var _this=this;
		$.ajax({
			url:url,
			method:"post",
			data:{
				amount:_this.reqamount,
				page:_this.page
			},
			complete:function(){
				_this.isReq=false;
				_this.$btn.text("load more");

			}

		}).done(function(data){
			success(data);
		}).fail(function(data){
			alert("服务器忙,请稍候再试试!");
		});
	}
	//这边layout的前提是图片已经加载完成
	Waterfall.prototype.layout=function($node){

		var itemH=$node.outerHeight(true);
		var value=Math.min.apply(null,this.arr);
		var index=this.arr.indexOf(value);
		var left=index*this.itemW;
		var top=value;
		this.arr[index]=this.arr[index]+itemH;
		$node.css({
			position: 'absolute',
			left:left,
			top:top
		});
		this.$ct.height(Math.max.apply(null,this.arr));
	}
	//当容器宽度变化的时候重新调整
	Waterfall.prototype.resize=function(){
		this.ctW=this.$ct.width();
		this.counts=Math.floor(this.ctW/this.itemW);
		this.$items=$ct.find("li");
		this.init();
		for(var i=0;i<this.items.length;i++){
			this.layout(this.items.eq(i));
		}
	}

	return Waterfall;
});