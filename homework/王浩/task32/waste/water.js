var waterfall = {
	init: function(url, wrapName) {
		this.url = url;
		this.wrapName = wrapName;
		this.judgeProperty();
	},

	judgeProperty: function() {
		if (document.querySelector("." + this.wrapName) !== null) {
			this.ct = document.querySelector("." + this.wrapName);
			this.ajax();
		} else if (document.querySelector("#" + this.wrapName)) {
			this.ct = document.querySelector("#" + this.wrapName);
			this.ajax();
		} else {
			console.log("请输入正确的属性名！！！");
		}
	},

	ajax: function() {
		var xhr = new XMLHttpRequest(),
			url = this.url,
			me = this;
		xhr.onreadystatechange = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				me.json = JSON.parse(xhr.responseText);
				if (me.json["status"]["code"] && me.json["status"]["code"] === "0") {
					me.dataInit();
				}
			}
		}
		xhr.open("get", url, true);
		xhr.send();
	},

	dataInit: function() {
		this.waterFall = document.createElement("div");
		this.waterFall.className = "water-model";
		this.waterWrap = document.createElement("ul");
		this.waterWrap.className = "water-wrap";
		this.waterWrap.style.position = "relative";
		this.waterFall.appendChild(this.waterWrap);
		this.waterListInit(); //列表内容初始化
		this.ct.appendChild(this.waterFall);
		this.getWidth();
		this.resizeEvent();	//窗口尺寸改变的时候重新排序
		},

	waterListInit: function() {
		// console.log(this.json)
		var array = this.json["data"];
		for (var key in array) {
			var waterList = document.createElement("li");
			var listTitle = document.createElement("h3");
			var listInfo = document.createElement("p");
			var listWrap = document.createElement("ul");
			var listLink = document.createElement("a");
			this.listTitleProp(listTitle, key); //listTitle属性设置
			this.listInfoProp(listInfo, key); //li属性设置
			this.listWrapProp(listWrap, key); //li属性设置
			this.listLinkProp(listLink, key); //li属性设置
			this.listProp(waterList, key); //li属性设置
			waterList.appendChild(listTitle);
			waterList.appendChild(listLink);
			waterList.appendChild(listInfo);
			waterList.appendChild(listWrap);
			this.waterWrap.appendChild(waterList);
		}
	},

	listProp: function(node, key) {
		var array = this.json["data"];
		node.id = array[key]["id"];
		node.className = "water-list";
		node.setAttribute("data-sub_ch", array[key]["sub_ch"])
		node.style.position = "absolute";
		node.style.listStyleType = "none";
		node.style.borderRadius = "5px";
		node.style.transition = "all 1s"; //添加延时动画
	},

	listTitleProp: function(node, key) {
		var array = this.json["data"];
		node.className = "list-title";
		var link = document.createElement("a");
		link.href = array[key]["url"];
		link.title = array[key]["name"];
		link.innerText = array[key]["short_name"];
		node.appendChild(link);
		var listSpan = document.createElement("span");
		listSpan.className = "list-span";
		listSpan.innerText = array[key]["createtime"];
		node.appendChild(listSpan);
	},

	listLinkProp: function(node, key) {
		var array = this.json["data"],
				linkImg = document.createElement("img");
		// linkImg.src = array[key]["img_url"];
		linkImg.title = array[key]["name"];
		linkImg.alt = array[key]["name"];
		linkImg.className = "list-img";
		linkImg.style.opacity = 0;
		linkImg.setAttribute("data-img_count", array[key]["img_count"]);
		linkImg.setAttribute("data-img_url", array[key]["img_url"]);
		node.href = array[key]["url"];
		node.appendChild(linkImg);
	},

	listInfoProp: function(node, key) {
		var array = this.json["data"];
		node.innerText = array[key]["short_intro"];
		node.className = "list-info";
	},

	listWrapProp: function(node, key) {
		var array = this.json["data"],
			arraySpan = [];
		node.className = "click-wrap"
		arraySpan[0] = "点击" + array[key]["click"];
		arraySpan[1] = "昨天" + array[key]["click_last_day"];
		arraySpan[2] = "上月" + array[key]["click_last_month"];
		arraySpan[3] = "上周" + array[key]["click_last_week"];
		arraySpan[4] = "今天" + array[key]["click_this_day"];
		arraySpan[5] = "当月" + array[key]["click_this_month"];
		arraySpan[6] = "这周" + array[key]["click_this_week"];
		for (var i = 0; i < 7; i++) {
			var li = document.createElement("li");
			var span = document.createElement("span");
			span.className = "click-span";
			span.innerText = arraySpan[i];
			li.className = "click-list"
			li.appendChild(span);
			node.appendChild(li);
		}
	},

	getWidth: function() {
		var img = document.querySelectorAll(".list-img")[2],
			me = this;
		function check() {
			if (img.width > 0 || img.height > 0) {
				me.imgWidth = img.width;
				// console.log(me.imgWidth)
				clearInterval(clock);
				me.getColNums();
				me.firstRowInit(); //第一次运算时候初始化数组为零；
				me.findMinValue(); //计算数组的最小值；
				me.listPosition(); //列表内容重定向；
				me.middlePosition(); //设置容器图片居中显示;
			}
		}
		var clock = setInterval(check, 40);
	},
	
	getColNums: function() {
		var ctWidth = this.ct.offsetWidth, //获取父容器的宽度
			winWidth = document.body.offsetWidth,
			width = 0;
		this.listWidth = this.waterWrap.firstChild.offsetWidth;
		// console.log(this.listWidth);
		if (ctWidth >= winWidth) {	//判断宽度，取最小值；
			width = winWidth;
		} else {
			width = ctWidth;
		}
		this.colNums = Math.floor(width / this.listWidth); //计算一行图片数量
	},

	firstRowInit: function() {
		this.colArray = [];
		for (var i = 0; i < this.colNums; i++) {
			this.colArray.push(0);
		}
	},

	findMinValue: function() {
		this.minValue = Math.min.apply({}, this.colArray); //数组最小值
		this.maxValue = Math.max.apply({}, this.colArray); //数组最小值
		this.index = this.colArray.indexOf(this.minValue); //最小值索引
	},

	listPosition: function() {
		var listArray = this.waterWrap.childNodes;
		for (var i = 0; i < listArray.length; i++) {
			listArray[i].style.top = this.minValue + "px";
			listArray[i].style.left = this.index * parseInt(listArray[i].offsetWidth) + "px";
			this.colArray[this.index] += parseInt(listArray[i].offsetHeight);
			this.findMinValue();
		}
		this.waterWrap.style.height = this.maxValue + "px";
		this.waterWrap.style.width = this.listWidth * this.colNums + "px";
	},

	middlePosition: function(){
		var ctWidth = this.ct.offsetWidth;
				wrapWidth = this.waterWrap.offsetWidth;
				winWidth = document.body.offsetWidth;
				distance = 0;
		if(ctWidth > winWidth){	//判断窗口宽度和容器宽度，取最小值
			distance = (winWidth - wrapWidth)/2;	//设置margin让内容居中显示
		}else{
			distance = (ctWidth - wrapWidth)/2;
		}
		this.waterWrap.style.marginLeft = distance + "px";
		// console.log(distance);
		//设置容器的高度为colarray中的最大值。
		// 可以给waterfall容器设置一个最小高度，比如min-height=1500px 这样页面刷新时候
		// 就不会出现高度为零，然后再撑开容器的情况。
	},

	resizeEvent: function() {
		var me = this;
		window.onresize = function() {
			me.getColNums(); //计算一行的图片数量
			me.firstRowInit(); //第一次运算时候初始化数组为零；
			me.findMinValue(); //计算数组的最小值；
			me.listPosition(); //列表内容重定向；
			me.middlePosition();	//内容居中显示;
		}
	},

	scrollEvent: function() {
		window.onscroll = function() { //监听滚动事件
		}
	},
}
var url = "data.json"; //json数据位置;
wrapName = "water-fall";
waterfall.init(url, wrapName);