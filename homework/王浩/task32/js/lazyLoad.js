var lazyLoad = {
	init: function(node) {
		this.num = 10;
		this.page = 1;
		this.node = node;
		this.ajax();
	},

	ajax: function() {
		var me = this;
		$.ajax({
			url: "http://platform.sina.com.cn/slide/album_tech",
			dataType: "jsonp",
			jsonp: "jsoncallback",
			data: {
				"app_key": "1271687855",
				"num": this.num,
				"page": this.page
			},
			success: function(data) {
				if (data && data["status"]["code"] == 0) {
					me.dataArr = data["data"];
					waterFall.init(me.dataArr, me.node, me.page, me.num); //瀑布流整理已经获取的数据；
					me.page++;
					setTimeout(function() {
						me.checkShow();
						me.scrollEvent();
					}, 500); //延迟一秒等待所有图片都加载完成再执行检查事件；
				}
			},
			error: function(data) {
				console.log(data);
			}
		});
	},

	checkShow: function() {
		var winHeight = document.documentElement.clientHeight;
		scrollHeight = window.scrollY;
		minHeight = waterFall.minValue;
		goTop.checkGoTop(); //触发goTop事件；
		if (winHeight + scrollHeight >= minHeight) {
			this.ajax(); //如果最小高度出现就触发ajax
		}
	},

	scrollEvent: function() {
		var me = this,
			clock = 0;
		window.onscroll = function() { //监听滚动事件
			if (clock) {
				clearTimeout(clock);
			}
			clock = setTimeout(function() {
				me.checkShow(); //滚动时候检查状态，是否需要触发ajax；
				goTop.checkGoTop(); //触发goTop事件；
			}, 300); //延时300ms进行滚动监听
		}
	}
}