function Tab(node, num) {
	this.node = node;
	this.data = {};
	var wrap = node;
	var tag = num;

	Tab.prototype.createNode = function() {
		var me = this;
		var clock;
		ajax(tag); //获取json数据
		clock = setInterval(function() { //检查ajax是否执行完成
			if (ajax.data) {
				clearInterval(clock);
				me.data = ajax.data;
				init(); //内容初始化
				bind(); //事件绑定
				wrap.appendChild(wrap.frag); //把DOM从临时容器加载到DOM树
			}
		}, 10); //设置最小粒度时间是10ms
	}

	function ajax(num) {
		var xhr = new XMLHttpRequest();
		url = "tab.json",
		me = this;
		xhr.onreadystatechange = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				var json = JSON.parse(xhr.responseText);
				if (json["status"] === 0) {
					ajax.data = json["data"][num];
				}
			}
		}
		xhr.open("get", url, true);
		xhr.send();
	}

	function init() {
		tabData(); //tab按钮初始化
		btnWrap(); //tab按钮第零层包裹层
		tabBtn(); //设置tab按钮包裹层属性
		btnWrapF(); //tab按钮第一层包裹层
		btnWrapS(); //tab按钮第二层包裹层
		contWrap(); //内容框；
	}

	function bind() {
		btnAnimate(); //按钮的切换状态
		btnCheck(); //检查按钮初始化状态
		tabCont1Size(); //检查tabcont1的尺寸
		tabContSize(); //tab内容框容器尺寸
	}

	function tabData() {
		wrap.width = ajax.data["size"]["width"]; //获取tab框架的宽度
		wrap.btnH = ajax.data["size"]["btnH"]; //获取按钮的高度
		// wrap.contH = ajax.data["size"]["contH"]; //获取内容框的高度，这个不好，把内容写死了，以废弃
		wrap.padding = ajax.data["size"]["padding"]; //获取按钮的间距
		wrap.count = ajax.data["count"]; //获取按钮数量
		wrap.startTag = ajax.data["startTag"]; //获取页面开始时候激活的按钮
		wrap.imgWidth = ajax.data["size"]["imgW"]; //获取图片的宽度
		wrap.imgHeight = ajax.data["size"]["imgH"]; //获取图片的高度
		wrap.layerFPT = ajax.data["size"]["layerFPT"]; //获取layerF的列表padding-top的值
		wrap.listM = ajax.data["size"]["listM"]; //获取list的列表margin: 5px 0;
		wrap.imgM = ajax.data["size"]["imgM"]; //获取图片的间距
		wrap.fontS = ajax.data["size"]["fontS"]; //获取图片的间距
		wrap.imgPlay = ajax.data["imgPlay"]["src"]; //获取图片hover状态的icon
		wrap.btnBg = ajax.data["color"]["btnBg"]; //获取按钮的背景色
		wrap.border = ajax.data["color"]["border"]; //获取tab的边框色
		wrap.btnBTop = ajax.data["color"]["btnBTop"]; //获取按钮的顶部border颜色
		wrap.fontC = ajax.data["color"]["fontC"]; //获取字体的颜色
		wrap.fontH = ajax.data["color"]["fontH"]; //获取字体hover时候的颜色
		wrap.tabBg = ajax.data["color"]["tabBg"]; //获取tab背景颜色颜色
		console.log(wrap.tabBg);
	}

	function btnWrap() {
		wrap.frag = document.createDocumentFragment(); //创建临时DOM容器
		wrap.style.fontSize = wrap.fontS + "px";
		wrap.tabBtn = document.createElement("div"); //创建tab按钮容器
		wrap.tabCont = document.createElement("div"); //创建tab内容框容器
		wrap.frag.appendChild(wrap.tabBtn);
		wrap.frag.appendChild(wrap.tabCont);
	}

	function tabBtn() {
		var node = wrap.tabBtn;
		node.className = "tab-btnWrap";
		node.style.width = wrap.width + "px";
		node.style.backgroundColor = wrap.btnBg;
		node.style.borderColor = wrap.border;
		node.style.borderStyle = "solid";
		node.style.borderWidth = "1px";
		node.style.borderRadius = "4px 4px 0 0";
	}

	function btnWrapF() {
		wrap.btnLayerF = document.createElement("div");
		wrap.btnLayerF.className = "tab-layerF";
		wrap.tabBtn.appendChild(wrap.btnLayerF)
	}

	function btnWrapS() {
		var node = wrap.btnLayerF;
		for (var i = 0, len = wrap.count; i < len; i++) {
			var btnLayerS = document.createElement("div");
			var btnEmpty = document.createElement("div");
			btnLayerS.appendChild(btnEmpty);
			var btnLink = document.createElement("a");
			btnLayerS.appendChild(btnLink);
			node.appendChild(btnLayerS);
			layerSProp(btnLayerS, i); //按钮的div属性
			layerSBorderReste(btnLayerS); //设置layers的border初始值
			btnEmptyProp(btnEmpty);	//空div的属性设置
			btnLinkProp(btnLink, i); //按钮的link属性
		}
	}

	function layerSProp(node, i) {
		node.className = "tab-layerS";
		node.setAttribute("data-count", i);
		node.style.height = wrap.btnH + "px";
	}

	function btnEmptyProp(node){
		node.className = "tab-btnEmpty";
		node.style.opacity = 0;
		node.style.borderStyle = "solid";
		node.style.borderWidth = 0;
		node.style.borderTopWidth = "2px";
		node.style.borderColor = wrap.btnBTop;
	}

	function btnLinkProp(node, i) {
		node.className = "tab-btnLink";
		node.href = ajax.data["value"][i]["link"];
		node.innerText = ajax.data["value"][i]["title"];
		node.style.lineHeight = wrap.btnH + "px";
		node.style.color = wrap.fontC;
		node.style.margin = "0 " + wrap.padding + "px";
		//把margin设置在a上，防止设置在div上面覆盖css的样式
		fontColor(node); //设置字体的hover颜色；
	}

	function btnAnimate() {
		wrap.nodeArr = wrap.btnLayerF.childNodes;
		for (var i = 0, len = wrap.count; i < len; i++) {
			wrap.nodeArr[i].addEventListener("mouseenter", function(e) {
				var num = e.target.dataset["count"]; //获取目标按钮的标签值
				toggleClass(num) //给目标按钮添加删除目标class
			}, false);
		}
	}

	function layerSBorderReste(node) {
		node.style.borderStyle = "solid";
		node.style.borderWidth = "1px";
		node.style.borderColor = wrap.btnBg;
		node.style.backgroundColor = wrap.btnBg;
		node.style.padding = 0;
		node.style.margin = 0;
	}

	function layerSBorderActive(node) {
		node.style.backgroundColor = wrap.tabBg;
		node.style.borderTopColor = wrap.btnBTop;
		node.style.borderLeftColor = wrap.border;
		node.style.borderRightColor = wrap.border;
		node.style.borderBottomColor = wrap.tabBg;
		node.style.paddingBottom = "1px";
		node.style.paddingTop = "1px";
		node.style.marginBottom = "-1px";
		node.style.marginTop = "-1px";
	}

	function layerSFirstBorder(node) {
		node.style.paddingLeft = "1px";
		node.style.marginLeft = "-1px";
		node.style.borderLeftColor = wrap.tabBg;
	}

	function toggleClass(num) {
		var btnArr = wrap.nodeArr,
			contArr = wrap.tabCont.childNodes,
			propCont = "show";

		for (var j = 0, len = btnArr.length; j < len; j++) {
			layerSBorderReste(btnArr[j]);
			btnArr[j].firstChild.style.opacity = 0;
			contArr[j].classList.remove(propCont);
		}

		if (num === "0") { //如果num=0，添加左边框-白色；
			layerSFirstBorder(btnArr[num]);
		}
		btnArr[num].firstChild.style.opacity = 1;
		layerSBorderActive(btnArr[num]);
		contArr[num].classList.add(propCont);
	}

	function btnCheck() {
		var start = wrap.startTag + ""; //把数值0转换为字符串“0”
		toggleClass(start) //给目标按钮添加active属性
	}

	function fontColor(node) {
		node.addEventListener("mouseenter", function() {
			node.style.color = wrap.fontH;
		}, false);
		node.addEventListener("mouseleave", function() {
			node.style.color = wrap.fontC;
		}, false);
	}

	function contWrap() {
		var node = wrap.tabCont;
		for (var i = 0, len = wrap.count; i < len; i++) {
			var contList = document.createElement("div");
			contList.className = "cont-list";
			contList.setAttribute("data-count", i);
			contList.style.width = wrap.width + "px";
			node.appendChild(contList);
			contListChild(contList, i); //cont内部分块结构
		}

	}

	function contListChild(node, num) {
		var layerF = document.createElement("div");
		layerF.className = "cont-layer cont-layerF";
		node.appendChild(layerF);
		var layerS = document.createElement("div");
		layerS.className = "cont-layer cont-layerS";
		node.appendChild(layerS);
		var layerT = document.createElement("div");
		layerT.className = "cont-layer cont-layerT";
		node.appendChild(layerT);
		layerFInit(layerF, num); //第一层内容初始化
	}

	function layerFInit(node, num) {
		var dev1 = document.createElement("div");
		dev1.className = "layerF-dev layerF-dev1";
		node.appendChild(dev1);
		var dev2 = document.createElement("div");
		dev2.className = "layerF-dev layerF-dev2";
		node.appendChild(dev2);
		//获取图片的内容数组
		var dataArr = ajax.data["value"][num]["content"][0]["cont1"];
		layerFDev1(dev1, num, dataArr);
		layerFDev2(dev2, num, dataArr);
	}

	function layerFDev1(node, num, array) {
		var imgArr = array[0]["dev1"];
		for (var i = 0, len = imgArr.length; i < len; i++) {
			var imgWrap = document.createElement("div");
			imgWrap.className = "layerF-imgWrap";
			imgWrap.style.margin = wrap.imgM + "px";
			var img = document.createElement("img");
			var imgLink = document.createElement("a");
			imgLink.className = "layerF-imgLink";
			imgLink.href = imgArr[i]["link"];
			imgWrap.appendChild(imgLink);
			var imgP = document.createElement("img");
			imgLink.appendChild(imgP);
			imgWrap.appendChild(img);
			node.appendChild(imgWrap);
			layerFDev1Img(imgArr, img, i); //dev1的图片详情
			contImgPlay(imgArr, imgP, i); //设置imgPlay的属性
		}
	}

	function layerFDev1Img(imgArr, node, num) {
		node.className = "layerF-img";
		node.title = imgArr[num]["title"];
		node.alt = imgArr[num]["title"];
		node.src = imgArr[num]["src"];
		node.style.width = wrap.imgWidth + "px";
		node.style.height = wrap.imgHeight + "px";
	}

	function contImgPlay(imgArr, node, num) {
		node.className = "cont-imgPlay";
		node.src = wrap.imgPlay;
		node.title = imgArr[num]["title"];
		node.alt = imgArr[num]["title"];
		node.style.width = wrap.imgWidth + "px";
		node.style.height = wrap.imgHeight + "px";
	}

	function layerFDev2(node, num, array) {
		var linkArr = array[1]["dev2"],
			listWrap = document.createElement("ul");
		for (var i = 0, len = linkArr.length; i < len; i++) {
			var list = document.createElement("li");
			list.className = "layerF-list";
			listWrap.appendChild(list);
			var link = document.createElement("a");
			list.appendChild(link);
			layerFDev2Link(link, i, linkArr); //设置dev2的link内容
			listProp(list) //设置list的参数；
		}
		node.appendChild(listWrap);
		listWrapProp(listWrap) //设置listwrap的参数；
		wrap.layerFDev2Len = len; //把len添加到全局属性；
		layerFDev2Size(node); //设置dev2的尺寸；
	}

	function layerFDev2Link(node, num, array) {
		node.className = "layerF-link";
		node.style.lineHeight = wrap.fontS + "px";
		// node.style.height = wrap.fontS + "px";
		node.style.fontSize = wrap.fontS + "px";
		node.href = array[num]["link"];
		node.innerText = array[num]["title"];
		node.style.color = wrap.fontC;
		fontColor(node); //设置字体的hover颜色；
	}

	function listWrapProp(node) {
		node.className = "layerF-listWrap";
		node.style.paddingTop = wrap.layerFPT + "px";
	}

	function listProp(node) {
		node.style.height = wrap.fontS + "px";
		node.style.marginTop = wrap.listM + "px";
		node.style.marginBottom = wrap.listM + "px";
	}

	function layerFDev2Size(node) {
		var dev1Width = (wrap.imgWidth + wrap.imgM * 2),
			width = wrap.width;
		dev2Width = width - dev1Width;
		node.style.width = dev2Width + "px";
	}

	function tabCont1Size() {
		var dev1H = wrap.imgHeight * 2 + wrap.imgM * 3;
		var dev2H = (wrap.fontS + wrap.listM * 2) * wrap.layerFDev2Len + wrap.layerFPT;
		//cont1的内容高度是dev1和dev2中的最大值
		wrap.cont1H = dev1H > dev2H ? dev1H : dev2H;
	}

	function tabContSize() {
		var node = wrap.tabCont;
		node.className = "tab-cont";
		node.style.height = wrap.cont1H + "px";
		node.style.width = wrap.width + "px";
		node.style.borderStyle = "solid";
		node.style.borderWidth = "1px";
		node.style.borderTopWidth = 0;
		node.style.borderColor = wrap.border;
	}

}

var node1 = document.querySelectorAll(".tab-box")[0]; //tab容器
var num1 = 0; //读取的数据组编号为1；
var a = new Tab(node1, num1);
a.createNode();
var node2 = document.querySelectorAll(".tab-box")[1]; //tab容器
var num2 = 1; //读取的数据组编号为2；
var b = new Tab(node2, num2);
b.createNode();
var node3 = document.querySelectorAll(".tab-box")[2]; //tab容器
var num3 = 2; //读取的数据组编号为3；
var c = new Tab(node3, num3);
c.createNode();
// 需要做的东西还是很多的，比如cont2的内容不会变化，查找原因