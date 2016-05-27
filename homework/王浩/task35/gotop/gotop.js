function GoTop() {
	this.ct = {};
	this.target = {};
	GoTop.prototype.createNode = function() {
		this.ct = document.createElement("div");
		this.ct.className = "gotop-ct";
		this.target = document.createElement("div");
		this.target.className = "gotop-target";
		this.target.innerText = "GoTop";
		this.ct.appendChild(this.target);
		document.body.appendChild(this.ct);
	};

	GoTop.prototype.bindEvent = function() {
		var ct = this.ct;
		var target = this.target;
		check(ct, target); //检查是否显示按钮
		scrollEvent(ct, target); //添加滚动监听事件
	};

	function check(ct, target) {
		var height = window.scrollY;
		if (height > 100) {
			ct.style.display = "block";
			target.addEventListener("click", function() {
				window.scrollTo(0, 0);
			}, false);
		} else {
			ct.style.display = "none";
		}
	}

	function scrollEvent(ct, target) {
		var clock = 0;
		window.onscroll = function() {
			if (clock) {
				clearTimeout(clock);
			}
			clock = setTimeout(function() {
				check(ct, target);
			}, 100);
		}
	}
}
var a = new GoTop();
var b = new GoTop();
a.createNode();
a.bindEvent();
b.createNode();