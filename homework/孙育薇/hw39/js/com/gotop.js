//有回到顶部功能
define(['jquery'],function($){
	//TODO: $node 看起来没什么用... 在特定元素旁边增加一个回到顶部的小按钮?
	function GoTop($node, n, text) {
		var position;
		var btnText;
		if (arguments.length === 2) {
			if (typeof arguments[1] === "number") {
				position = arguments[1];
				btnText = "Top";
			} else if (typeof arguments[1] === "string") {
				btnText = arguments[1];
				position = 900;
			} else {
				btnText = "Top";
				position = 900;
			}
		} else {
			position = n || 900;
			btnText = text || "Top";
		}
		this.$node = $node;
		this.$btn = $('<button class="btn go-top">' + btnText + '</button>');
		this.$btn.appendTo(this.$node);
		this.bindEvent(position);
	}

	GoTop.prototype = {
		bindEvent: function(n) {
			var me = this;
			$(window).on("scroll", function() {
				if ($(window).scrollTop() > n) {
					me.$btn.show();
				} else {
					me.$btn.hide();
				}
			});
			this.$btn.on("click", function() {
				$("body").animate({
					"scrollTop": 0
				}, 500);
			});
		}
	};
	return GoTop;
});


// var fo = new GoTop($("#footer"));
// var ti = new GoTop($(".timeline"), 500);
// var se = new GoTop($("#team"), "回到顶部");
// var ls = new GoTop($("#banner"), 700, "Go Top");
