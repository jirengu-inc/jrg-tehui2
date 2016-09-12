define(["jquery"],function(){
	function waterFall($el){
		this.box = $el;
		this.init();
	}
	
	waterFall.prototype.init = function setWf(){
		var $item = this.box.children(),
		    oWidth = this.box.find("li").outerWidth(true),
		    colArr = [],
		    corArr2 = [],
		    oParent = this.box.parent(),
		    count = parseInt(this.box.width()/oWidth),
		    that = this;
		this.parent = oParent;
		for(var i=0;i<count;i++){
			colArr.push(0); // 首次每一栏高度为0
		}
	    $item.each(function(){
	    	$(this).height(Math.floor(Math.random()*240)+220);
	    	var idx = 0,
	    	    minH = colArr[0];
	    	for(var j=0;j<colArr.length;j++){
	    		if(minH>colArr[j]){
	    			minH = colArr[j];
	    			idx = j;
	    		}
	    	}
	    	$(this).css({
	    		"left":idx*oWidth,
	    		"top":minH
	    	});
	    	colArr[idx] += $(this).outerHeight(true);
	    	var maxH = Math.max.apply(null,colArr);
	    	that.parent.height(maxH); // 撑开父容器高度
	    	colArr2 = colArr;
	    	return colArr2;
	    });
	    console.log(colArr2);
	    
	     //点击加载更多事件	
	    var $btn = that.box.parent().next(), //遍历的时候都最好检查一下
	        cur = 12;
	    $btn.on("click",function(e){
	    	e.stopPropagation();
	        load();  
	    });
	    
	    function load(){
	    	$.ajax({
	        	url:"test.php",
	        	dataType:"jsonp",
	        	type:"get",
	        	data:{
	        		len:8,
	        		from:cur
	        	},
	        	success:function(res){
	        		showData(res);
	        	},
	        	error:function(){
	        		error();
	        	}
	        });
	    }
	    
	    
	    function showData(res){
	    	if(res.status===0){
	    		for(var v=0;v<res.data.length;v++){
	    			var minHt = Math.min.apply(null,colArr2),
	    			    curIdx;
	                for(var m=0;m<colArr2.length;m++){
	                	if(lef == colArr2[m]){
	                		curIdx = m;
	                		return curIdx;
	                	}
	                }
	                res.data[v].css({
	                	"left":curIdx*oWidth,
	                	"top": minHt
	                });
	                colArr2.eq(curIdx) += res.data[v].outerHeight(true);
	    		}
	    	}else{
	    		alert("try again");
	    	}
	    }
	    
	    function error(){
	    	alert("无法获取数据");
	    }
	    
	};
	return waterFall;
});