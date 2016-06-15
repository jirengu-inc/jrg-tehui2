var goTop = {
	init: function() {
		this.dataInit();
	},

	dataInit: function() {
		this.btn = document.createElement("div");
		this.btn.className = "go-top";
		this.btn.style.display = "none";
		var img = document.createElement("img");
		img.src = "img/top.svg";
		img.alt = "回到顶部";
		img.title = "回到顶部";
		this.btn.appendChild(img);
		document.body.appendChild(this.btn);
		this.goTopClick();	//绑定点击事件
	},

	checkGoTop: function() {
		var me = this;
		scrollHeight = window.scrollY;
		if (scrollHeight >= 200) {
			me.btn.style.display = "block";
		} else {
			me.btn.style.display = "none";
		}
	},

	goTopClick: function() {
		this.btn.addEventListener("click", function() {
			window.scrollTo(0, 0);
		}, false);
	}
}