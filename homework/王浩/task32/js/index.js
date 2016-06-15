var result = {
	init: function(nodeName) {
		this.nodeName = nodeName;
		this.judgeNode(); //判断节点类型
		goTop.init(); //加载gotop事件
	},

	judgeNode: function() {
		if (document.querySelector("." + this.nodeName) !== null) {
			this.ct = document.querySelector("." + this.nodeName);
			lazyLoad.init(this.ct); //获取数据
		} else if (document.querySelector("#" + this.nodeName)) {
			this.ct = document.querySelector("#" + this.nodeName);
			lazyLoad.init(this.ct); //获取数据
		} else {
			console.log("请输入正确的属性名！！！");
		}
	}
}
result.init("water-fall");