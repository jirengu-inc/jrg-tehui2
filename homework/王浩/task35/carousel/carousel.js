function Carousel(node, imgGroup) {
	this.node = node; //获取容器节点
	this.imgInfo = {}; //获取图片的详情
	var ct = node;
	var imgGroupNum = parseInt(imgGroup.replace(/([a-z]||[A-Z]||0)+/g, "")) - 1; //获取图片组的标号

	Carousel.prototype.createNode = function() {
		var me = this;
		var clock;
		ajax(imgGroupNum); //获取json数据
		clock = setInterval(function() { //检查ajax是否执行完成
			if (ajax.info) {
				clearInterval(clock);
				me.imgInfo = ajax.info;
				carouselInit(); //轮播框架初始化
			}
		}, 10); //设置最小粒度时间是10ms
	};

	function ajax(num) {
		var xhr = new XMLHttpRequest();
		url = "img.json";
		xhr.onreadystatechange = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				var json = JSON.parse(xhr.responseText);
				ajax.info = json["data"][num]; //把json绑定到ajax的静态变量info
			}
		}
		xhr.open("get", url, true);
		xhr.send();
	}

	function carouselInit() {
		var frag = document.createDocumentFragment(); //创建一个临时DOM容器
		ct.carouselImgWrap = document.createElement("div"); //创建图片容器
		frag.appendChild(ct.carouselImgWrap);
		ct.arrowLeft = document.createElement("div"); //创建左箭头容器
		frag.appendChild(ct.arrowLeft);
		ct.arrowRight = document.createElement("div"); //创建右箭头容器
		frag.appendChild(ct.arrowRight);
		ct.bullet = document.createElement("div"); //创建按钮容器
		frag.appendChild(ct.bullet);
		ct.count = ajax.info["count"];
		ct.width = ajax.info["width"];
		ct.height = ajax.info["height"];
		ct.start = ajax.info["start"] - 1; //轮播起始图片标号

		carouseCtInit() //轮播框架的尺寸设置
		carouselImgWrapInit() //轮播图片初始化
		arrowLeftInit() //左箭头初始化
		arrowRightInit() //右箭头初始化
		bulletInit() //轮播按钮初始化
		bind() //绑定的事件
		ct.appendChild(frag); //把临时DOM容器的内容添加到DOM树
	}

	function carouseCtInit() {
		ct.style.width = ct.width + "px";
		ct.style.height = ct.height + "px";
	}

	function carouselImgWrapInit() {
		var node = ct.carouselImgWrap;
		node.className = "carousel-imgWrap";
		ct.listWrap = document.createElement("ul");
		node.appendChild(ct.listWrap);
		for (var i = 0, len = ct.count; i < len; i++) {
			ct.imgList = document.createElement("li");
			ct.imgLink = document.createElement("a");
			ct.imgList.appendChild(ct.imgLink);
			ct.imgData = document.createElement("img");
			ct.imgLink.appendChild(ct.imgData);

			imgListInit(i); //图片列表初始化
			imgLinkInit(i); //图片链接初始化
			imgDataInit(i); //图片内容初始化

			ct.listWrap.appendChild(ct.imgList);
		}
		imgCopyInit(); //克隆图片内容初始化
		listWrapInit(); //ul内容初始化
	}

	function imgListInit(num) {
		var node = ct.imgList;
		node.className = "carousel-imgList";
	}

	function imgLinkInit(num) {
		var node = ct.imgLink;
		node.className = "carousel-imgLink";
		node.title = ajax.info["value"][num]["title"].toUpperCase();
		node.href = ajax.info["value"][num]["link"];
	}

	function imgDataInit(num) {
		var node = ct.imgData,
			imgNum = ajax.info["value"][num]["num"] - 1;
		node.className = "carousel-imgData";
		node.title = ajax.info["value"][num]["title"].toUpperCase();
		node.alt = ajax.info["value"][num]["title"].toUpperCase();
		node.src = ajax.info["value"][num]["src"];
		node.style.width = ct.width + "px";
		node.style.height = ct.height + "px";
		node.setAttribute("data-imgCount", imgNum);
	}

	function imgCopyInit() {
		var node = ct.listWrap;
		var imgCopyFirst = node.lastChild.cloneNode(true);
		var imgCopyLast = node.firstChild.cloneNode(true);
		node.insertBefore(imgCopyFirst, node.firstChild);
		node.insertBefore(imgCopyLast, null);
	}

	function listWrapInit() {
		var node = ct.listWrap;
		node.className = "carousel-listWrap";
		var newCount = node.childNodes.length;
		node.style.width = newCount * ct.width + "px";
		node.style.left = -ct.width * (ct.start + 1) + "px";
	}

	function arrowLeftInit() {
		var node = ct.arrowLeft;
		node.className = "carousel-arrow arrowWrap-left";
		var iconLeft = document.createElement("img");
		iconLeft.className = "carousel-iconLeft";
		iconLeft.src = ajax.info["icon"]["src_left"];
		node.appendChild(iconLeft);
		node.style.left = "10px";
		arrowPosition(node, iconLeft); //icon基本尺寸信息和垂直位置
	}

	function arrowRightInit() {
		var node = ct.arrowRight;
		node.className = "carousel-arrow arrowWrap-right";
		var iconRight = document.createElement("img");
		iconRight.className = "carousel-iconRight";
		iconRight.src = ajax.info["icon"]["src_right"];
		node.appendChild(iconRight);
		node.style.right = "10px";
		arrowPosition(node, iconRight); //icon基本尺寸信息和垂直位置
	}

	function arrowPosition(node, icon) {
		var iconWidth = ajax.info["icon"]["width"];
		var iconHeight = ajax.info["icon"]["height"];
		icon.style.width = iconWidth + "px";
		icon.style.height = iconHeight + "px";
		node.style.top = ct.height / 2 + "px";
		node.style.marginTop = -iconHeight / 2 + "px";
	}

	function bulletInit() {
		var node = ct.bullet,
			width = ajax.info["bullet"]["width"],
			height = ajax.info["bullet"]["height"],
			margin = ajax.info["bullet"]["margin"];

		for (var i = 0, len = ct.count; i < len; i++) {
			var btn = document.createElement("a");
			btn.className = "carousel-btn";
			btn.title = ajax.info["value"][i]["title"].toUpperCase();
			btn.style.width = width + "px";
			btn.style.height = height + "px";
			btn.style.borderRadius = height + "px";
			btn.style.marginRight = margin + "px";
			btn.style.backgroundColor = ajax.info["bullet"]["color"];
			btn.setAttribute("data-num", ajax.info["value"][i]["num"] - 1);
			node.appendChild(btn);
		}
		bulletWrapInit(width, margin); //bullet容器初始化
	}

	function bulletWrapInit(width, margin) {
		var node = ct.bullet,
			bottom = ajax.info["bullet"]["bottom"],
			bulletWrapWidth = 0;
		bulletWrapWidth = (width + margin) * ct.count;
		node.className = "carousel-bullet";
		node.style.bottom = bottom + "px";
		node.style.left = ct.width / 2 + "px";
		node.style.marginLeft = -bulletWrapWidth / 2 + "px";
	}

	function bind() {
		arrowTitleCheck() //检查arrow的title
		arrowClick() //绑定箭头的点击事件
		bulletCheck() //bullet按钮状态检查
		bulletClick() //bullet按钮点击事件
		autoPlay() //自动播放事件
	}

	function arrowTitleCheck() {
		var left = ct.arrowLeft,
			right = ct.arrowRight,
			leftNum = ct.start - 1,
			rightNum = ct.start + 1;
		if (ct.start === 0) {
			leftNum = ct.count - 1;
		} else if (ct.start === ct.count - 1) {
			rightNum = 0;
		}
		left.title = ajax.info["value"][leftNum]["title"].toUpperCase();
		right.title = ajax.info["value"][rightNum]["title"].toUpperCase();
	}

	function arrowClick() {
		var left = ct.arrowLeft;
		var right = ct.arrowRight;
		$(left).on("click", function() {
			arrowLeftAnimate(); //左按钮的动画效果
		});
		$(right).on("click", function() {
			arrowRightAnimate(); //右按钮的动画效果
		});
	}

	function arrowLeftAnimate(value) {
		var num = value || 1;
		if ($(ct.listWrap).is(":animated")) { //清除动画累计
			return;
		}

		if (ct.start === 0) {

			$(ct.listWrap).animate({
				"left": "+=" + ct.width + "px"
			}, 1000, function() {
				$(ct.listWrap).css({
					"left": -ct.width * ct.count + "px"
				});
			});
			ct.start = ct.count - 1;
		} else {
			$(ct.listWrap).animate({
				"left": "+=" + ct.width * num + "px"
			}, 1000);
			ct.start -= num;
		}
		arrowTitleCheck(); //检查arrow的title
		bulletCheck(); //检查bullet的颜色状态
	}

	function arrowRightAnimate(value) {
		var num = value || 1;
		if ($(ct.listWrap).is(":animated")) { //清除动画累计
			return;
		}
		if (ct.start === ct.count - 1) {
			$(ct.listWrap).animate({
				"left": "-=" + ct.width + "px"
			}, 1000, function() {
				$(ct.listWrap).css({
					"left": -ct.width + "px"
				});
			});
			ct.start = 0;
		} else {

			$(ct.listWrap).animate({
				"left": "-=" + ct.width * num + "px"
			}, 1000);
			ct.start += num;
		}
		arrowTitleCheck(); //检查arrow的title
		bulletCheck(); //检查bullet的颜色状态
	}

	function bulletCheck() {
		var array = ct.bullet.childNodes,
			color = ajax.info["bullet"]["color"];
		activeColor = ajax.info["bullet"]["activeColor"];
		for (var i = 0, len = array.length; i < len; i++) {
			array[i].style.backgroundColor = color;
		}
		array[ct.start].style.backgroundColor = activeColor;
	}

	function bulletClick() {
		ct.bullet.addEventListener("click", function(e) {
			var toNum = e.target.dataset["num"];
			var value = toNum - ct.start;
			if (value > 0) {
				arrowRightAnimate(value);
			}
			if (value < 0) {
				arrowLeftAnimate(Math.abs(value));
			} else {
				return;
			}
		}, false);

	}

	function autoPlay() {
		var direction = ajax.info["autoPlay"];
		var delay = ajax.info["delay"];
		if (ct.clock) {
			stop();
		}
		ct.clock = setTimeout(function() {
			if (direction === "left") {
				arrowRightAnimate();
			} else if (direction === "right") {
				arrowLeftAnimate();
			}
			autoPlay();
		}, delay);
	}

	function stop() {
		clearTimeout(ct.clock);
	}
}

var node1 = document.querySelectorAll(".carousel-ct")[0];
var node2 = document.querySelectorAll(".carousel-ct")[1];
var node3 = document.querySelectorAll(".carousel-ct")[2];
var a = new Carousel(node1, "imgGroup01");
a.createNode();
var b = new Carousel(node2, "imgGroup02");
b.createNode();
var c = new Carousel(node3, "imgGroup03");
c.createNode();