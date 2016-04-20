define(['jquery'],function($){
function Waterfall($node, width, count) {
	this.$ctNode = $node;
	this.itemWidth = width;
	this.start = 0;
	this.count = count || 4;
	this.imgIsLoaded = true;
	this.isLoadingItem = false;
}

Waterfall.prototype = {
	setHeightArr : function() {
		this.length = parseInt(this.$ctNode.width() / this.itemWidth);
		this.heightArr = [];
		for (var i = 0; i < this.length; i++) {
			this.heightArr.push(0);
		}
	},
	getMinHeight : function() {
		var minHeight = Math.min.apply(null,this.heightArr);
		return this.heightArr.indexOf(minHeight);
	},
	getMaxHeight : function() {
		var maxHeight = Math.max.apply(null,this.heightArr);
		return this.heightArr.indexOf(maxHeight);
	},
	setHTML : function() {
		var message = '<p class="msg"></p>';
		var addMoreBtn = '<button class="btn">More...</button>';
		this.$ctNode.addClass("waterfall");
		this.$ctNode.append($('<ul></ul>'));
		this.$ctNode.append($(message));
		this.$ctNode.append($(addMoreBtn));
	},
	fetchItem : function() {
		var me = this;
		if(!this.isLoadingItem) {
			this.isLoadingItem = true;
			$.ajax({
				url: 'data/waterfall.php',
				dataType: 'json',
				type: 'get',
				cache: true,
				data: {
					"start": this.start,
					"count": this.count
				},
				success: function (response) {
					me.isLoadingItem = false;
					if (response["success"]) {
						if (response["error"]) { //有错误出现,不加载图片,显示错误信息
							me.$ctNode.find(".msg").text(response["message"]);
							me.$ctNode.find(".msg").show();
						} else {
							if (response["message"] === "") { //一切正常
								me.start += me.count;
							} else { //后端数据已不足以让start继续增加
								//显示 no more data
								me.$ctNode.find(".msg").text(response["message"]);
								me.$ctNode.find(".msg").show();
							}
							me.setItems(response["items"]);
						}
						if (response["message"] === "No more data...") { //后端图片已全部加载,无法继续
							me.$ctNode.find(".btn").hide();
						}
					}
				},
				error: function () {
					me.isLoadingItem = false;
					alert("数据获取错误,请重试");
				}
			});
		}
	},
	confirmLoad: function($node) {
		var defereds = [];
		var me = this;
		$node.find("img").each(function(){
			var defer = $.Deferred();
			$(this).load(function(){
				defer.resolve();
			});
			defereds.push(defer);
		});
		$.when.apply(null,defereds).done(function() {
			me.imgIsLoaded = true;
			me.placeItems();
		});
	},
	setItems : function(items) {
		for (var i = 0; i < items.length; i++) {
			var $li = $('<li data-ranged="false">' +
				// '<a href="#'+ items[i]["link"] + '">' +
				'<img src="'+ items[i]["img"] +'">' +
				// '</a>' +
				'<h4>' + items[i]["title"] +'</h4>' +
				'<p>'+ items[i]["intro"] +'</p>' +
				'</li>');
			$li.find("img").css("width", this.itemWidth);
			this.$ctNode.children("ul").append($li);
			this.imgIsLoaded = false;
			this.confirmLoad($li);
		}
	},
	placeItems: function() {
		var me = this;
		this.setHeightArr();
		this.$ctNode.find("li").each(function() {
			if ($(this).attr("data-ranged") == "true") return;
			var idx = me.getMinHeight();
			$(this).css({
				"left": $(this).outerWidth(true) * idx,
				"top": me.heightArr[idx]
			});
			me.heightArr[idx] += $(this).outerHeight(true);
			me.$ctNode.children("ul").height(me.heightArr[me.getMaxHeight()]);
		});
	},
	bindEvent: function() {
		var me = this;
		this.$ctNode.find(".btn").on("click", function() {
			if(me.imgIsLoaded) {
				me.fetchItem();
			}
		});
	},
	init : function() {
		this.setHeightArr();
		this.setHTML();
		this.fetchItem();
		this.bindEvent();
	}
};
	return Waterfall;
});