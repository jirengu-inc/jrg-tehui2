//--------ajax函数--------
		
		function ajax(opts){
		       var xmlhttp;
		       if(window.XMLHttpRequest){
		        xmlhttp= new XMLHttpRequest();    //code for IE7+,ff ,chrome,opera,safari
		       }else{
		        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");  // code for IE 6, 5
		       }
		      
		       xmlhttp.onreadystatechange=function(){
		        if (xmlhttp.readyState==4 & xmlhttp.status==200) {
		            var json=JSON.parse(xmlhttp.responseText);   //将后台传送的json数据转换字符串对象
		            opts.success(json);  // 数据传入目标函数
		        }
		        else if(xmlhttp.readyState==4 & xmlhttp.status==404){
		            opts.error();
		        }
		       }

			     var dataStr='';
			     for(var key in opts.data){
			        dataStr += key +'='+opts.data[key]+'&';  //拼装键值对
			     }
			     dataStr= dataStr.substr(0,dataStr.length-1);  // 删除最后的&符号

			     if (opts.type.toLowerCase() ==='get') {
			        xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
			        xmlhttp.send();
			     }
			     if (opts.type.toLowerCase() ==='post') {
			        xmlhttp.open(opts.type,opts.url,true);
			        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
			        xmlhttp.send(dataStr);
			     }
			};

//-------工具封装-------

var hasClass=function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        if( ele.className.match(reg) ){
            return true;
        }else{
            return false;
        }
    },

    addClass=function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                singleAddClass(ele[i],cls);
            }
        }else{
            singleAddClass(ele, cls);
        }
    },

    removeClass=function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                singleRemoveClass(ele[i],cls);
            }
        }else{
            singleRemoveClass(ele,cls);
        }
    },

    singleAddClass=function(ele,cls){
        if(hasClass(ele,cls)){
            return true;
        }
        ele.className += ' '+cls;
    },

    singleRemoveClass=function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        ele.className = ele.className.replace(reg,'');
    },

    indexOf=function(ele){
        var parent = ele.parentElement,
            broEle = parent.children;
        for(var i=0; i<broEle.length;i++){
            if(ele === broEle[i]){
                return i;
            }
        }
        return -1;
    }

//-----验证用户名函数------
		function testusername(){
			var re=/^\w{5,10}$/g;
			if (re.test(username.value)){
				ajax({
				url:'userName.php',
				type:'post',
				data:{
					"username":username.value
				},
				success:function(ret){
					if(!ret.data){
						addClass(alert1,'error');
						alert1.innerHTML=username.value+"已经被注册，请更换一个";
					}
					else {
						removeClass(alert1,'error');
						alert1.innerHTML="恭喜！"+username.value+"可以使用";
							
							}
						},
				error: function(){
					alert ("出错了");	
						},
					});
				}
			else{
				addClass(alert1,'error');
				alert1.innerHTML="用户名格式不正确";
			}
		};