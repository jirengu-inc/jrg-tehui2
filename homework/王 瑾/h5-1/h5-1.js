function Timeline(){
	this.order = [];//动画序列
	this.add  = function(delay,handler){
		this.order.push({
			delay:delay,
			handler:handler
		});
	};
	this.start = function(){
		for(key in this.order){
			(function(me){
				var fn = me.handler,
				    time = me.delay;
				setTimeout(fn,time);
			})(this.order[key]);
		}
	};
}

var s1 =  new Timeline(), //初始场景
    s2 = new Timeline(); //粽子展开的场景

s1.add(1,function(){
	var $box = $("#zzbox");
	$box.addClass("c_box_rock");
	$("#zzbox").removeClass("c_box_rock");
	s2.start();
});

s2.add(300,function(){
	$("#rope").removeClass("c_shengzi1").addClass("c_shengzi2");
});

s2.add(700,function(){
	$("#rope").removeClass("c_shengzi2").addClass("c_shengzi3");
});

s2.add(1100,function(){
	$("#rope").removeClass("c_shengzi3").addClass("c_shengzi4");
});

s2.add(1600,function(){
	$("#rope").removeClass("c_shengzi4").addClass("c_shengzi0");
});

s2.add(2100,function(){
	$("#meat").addClass("c_zongzirou_in");
	$("#zz").addClass("c_zongzi_out");
	$("#ll").addClass("c_zuoye_in");
	$("#lr").addClass("c_youye_in");
});

s2.add(3100,function(){
	$("#ll").removeClass("c_zuoye_in").addClass("c_zuoye_out");
	$("#lr").removeClass("c_youye_in").addClass("c_youye_out");
	$("#lb").addClass("c_diye_in");
	$("#jx").addClass("c_t_in");
});

s1.start();