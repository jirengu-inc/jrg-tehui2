//1.封装一个 ajax 函数，能通过如下方式调用
// document.querySelector('#btn').addEventListener('click', function(){
//     ajax({
//         url: 'getData.php',   //接口地址
//         type: 'get',               // 类型， post 或者 get,
//         data: {
//             username: 'xiaoming',
//             password: 'abcd1234'
//         },
//         success: function(ret){
//             console.log(ret);       // {status: 0}
//         },
//         error: function(){
//            console.log('出错了')
//         }
//     })
// });
alert("hello");
function ajax(opts){
    var xhr=createAjax();
    var data="";
    if (!xhr) return null;
    for(var v in opts.data){
		data= data+v+"="+opts.data[v]+"&";
    }
    data=data.replace(/^&+|&+$/g,"");
    if(opts.type.toLowerCase() === "get"){
    	var url=opts["url"]+"?"+data;
    	xhr.open("get",url,true);
    	xhr.send();
    };
    if(opts.type.toLowerCase() === "post"){
    	xhr.open("post",opts.url,true);
    	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	request.send(data);
    };
	xhr.onreadystatechange = function() {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var responseText=JSON.parse(xhr.responseText);
	        opts.success(responseText);
	    }
	    if (xhr.readyState === 4 && xhr.status === 404) {
	        opts.error();
	    }
	};
}

function createAjax(){  
    if(window.ActiveXObject){  
        try{  
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");  
        }catch(e){  
            xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");  
        }  
        return xmlHttpRequest;  
    }else if(window.XMLHttpRequest){  
        return new XMLHttpRequest();  
    }else{
    	return null;
    }  
}  