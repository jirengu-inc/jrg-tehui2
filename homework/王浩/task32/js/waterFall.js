var waterFall = {
	init: function(dataArr, node, page, num) {
		this.dataArr = dataArr;
		this.node = node;
		this.page = page;
		this.num = num;
		this.margin = 10; //图片间距10px;
		this.dataCheck(); //检查容器waterWrap是否存在
	},

	dataCheck: function() {
		if (!this.waterWrap) {
			this.dataInit(); //如果不存在，就创建
		}
		this.dataEvent();	//执行事件
	},

	dataInit: function() {
		this.waterWrap = document.createElement("ul");
		this.waterWrap.className = "water-wrap";
		this.waterWrap.style.position = "relative";
		this.node.appendChild(this.waterWrap, this.node.firstChild);
	},

	dataEvent: function() {
		this.waterListInit(); //列表内容初始化
		this.getColNums(); //计算一行的图片数；
		this.checkColArray(); //监测colarray是否存在；
		this.loopImg(); //遍历图片
		this.resizeEvent(); //窗口尺寸改变的时候重新排序
	},

	waterListInit: function() {
		var array = this.dataArr;
		for (var key in array) {
			var waterList = document.createElement("li");
			var listTitle = document.createElement("h3");
			var listInfo = document.createElement("p");
			var listWrap = document.createElement("ul");
			var listLink = document.createElement("a");
			this.listProp(waterList, key); //li属性设置
			this.listTitleProp(listTitle, key); //listTitle属性标题设置
			this.listLinkProp(listLink, key); //图片链接属性设置
			this.listInfoProp(listInfo, key); //内容简介属性设置
			this.listClickProp(listWrap, key); //click点击率属性设置
			waterList.appendChild(listTitle);
			waterList.appendChild(listLink);
			waterList.appendChild(listInfo);
			waterList.appendChild(listWrap);
			this.waterWrap.appendChild(waterList);
		}
	},

	listProp: function(node, key) {
		var array = this.dataArr;
		node.id = array[key]["id"];
		node.className = "water-list";
		node.setAttribute("data-sub_ch", array[key]["sub_ch"]);
	},

	listTitleProp: function(node, key) {
		var array = this.dataArr;
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
		var array = this.dataArr;
		linkImg = document.createElement("img");
		linkImg.src = array[key]["img_url"];
		linkImg.title = array[key]["name"];
		linkImg.alt = array[key]["name"];
		linkImg.className = "list-img";
		// linkImg.style.opacity = 0;
		linkImg.setAttribute("data-img_count", array[key]["img_count"]);
		node.href = array[key]["url"];
		node.appendChild(linkImg);

	},

	listInfoProp: function(node, key) {
		var array = this.dataArr;
		node.innerText = array[key]["short_intro"];
		node.className = "list-info";
	},

	listClickProp: function(node, key) {
		var array = this.dataArr,
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

	getColNums: function() {
		var ctWidth = this.node.offsetWidth, //获取父容器的宽度
			winWidth = document.body.offsetWidth,
			width = 0;
		this.listWidth = this.waterWrap.firstChild.offsetWidth + this.margin;
		if (ctWidth >= winWidth) { //判断宽度，取最小值；
			width = winWidth;
		} else {
			width = ctWidth;
		}
		this.colNums = Math.floor(width / this.listWidth); //计算一行图片数量
	},

	checkColArray: function() {
		if (!this.colArray) {
			this.firstRows();
		}
	},

	firstRows: function() {
		this.colArray = [];
		for (var i = 0; i < this.colNums; i++) {
			this.colArray.push(0);
		}
	},

	loopImg: function() {
		this.startNum = (this.page - 1) * this.num;
		this.endNum = this.page * this.num;
		for (var i = this.startNum; i < this.endNum; i++) {
			this.judgeHeight(i); //当图片的高不为零时候获取li高度
		}
	},

	judgeHeight: function(num) {
		var img = this.waterWrap.childNodes[num].childNodes[1].firstChild,
			me = this;
		var check = function() {
			if (img.height > 0) {
				clearInterval(clock); //当高度为零时候清除定时器；
				me.findMinValue(); //计算数组的最小值；
				me.listPosition(num); //列表内容重定向；
				me.middlePosition(); //设置容器图片居中显示;
			}
		}
		var clock = setInterval(check, 40); //设置定时器，每隔40ms查询一次图片高度
	},

	findMinValue: function() {
		this.minValue = Math.min.apply({}, this.colArray); //数组最小值
		this.maxValue = Math.max.apply({}, this.colArray); //数组最小值
		this.index = this.colArray.indexOf(this.minValue); //最小值索引
	},

	listPosition: function(i) {
		var listArray = this.waterWrap.childNodes;
		listArray[i].style.top = this.minValue + "px";
		listArray[i].style.left = this.index * (parseInt(listArray[i].offsetWidth) + this.margin) + "px";
		this.colArray[this.index] += parseInt(listArray[i].offsetHeight + this.margin);
		this.findMinValue();
		this.waterWrap.style.height = this.maxValue + "px";
		this.waterWrap.style.width = this.listWidth * this.colNums + "px";
	},

	middlePosition: function() {
		var ctWidth = this.node.offsetWidth;
		wrapWidth = this.waterWrap.offsetWidth;
		winWidth = document.body.offsetWidth;
		distance = 0;
		if (ctWidth > winWidth) { //判断窗口宽度和容器宽度，取最小值
			distance = (winWidth - wrapWidth) / 2; //设置margin让内容居中显示
		} else {
			distance = (ctWidth - wrapWidth) / 2;
		}
		this.waterWrap.style.marginLeft = distance + "px";
		//设置容器的高度为colarray中的最大值。
		// 可以给waterfall容器设置一个最小高度，比如min-height=1500px 这样页面刷新时候
		// 就不会出现高度为零，然后再撑开容器的情况。
	},

	resizeEvent: function() {
		var me = this;
		window.onresize = function() {
			me.getColNums(); //计算一行的图片数；
			me.firstRows();
			// me.checkColArray(); //当窗口尺寸变化时候检查重置colArray为零；
			me.findMinValue(); //计算数组的最小值；
			me.count = me.waterWrap.childNodes.length;
			// console.log(me.count)
			for (var i = 0; i < me.count; i++) {
				me.listPosition(i); //遍历每一个列表，重新定位
			}
			me.middlePosition(); //设置容器图片居中显示;
			//因为窗口尺寸变化时候不需要判断图片高度是否为零，因为图片已经缓存，尺寸肯定存在
			//所以直接定位就可以了。
		}
	}

}