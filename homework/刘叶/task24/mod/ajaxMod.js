function ajax(opts){
    var xhr=createAjax();
    if (!xhr) {
        alert('请升级浏览器');
        return false;
    }
    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';//将需要发送的具体信息以键值的样子来拼装
    }
    dataStr = dataStr.replace(/&$/g, '');//去掉最后一个&
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var responseText=JSON.parse(xhr.responseText);//将php返回的json格式的数据转换成字符串对象
            opts.success(responseText);//将数据传递到目标函数内
        }
        if (xhr.readyState === 4 && xhr.status === 404) {
            opts.error();//失败之后如何处理
        }
    };
    if (opts.type.toLowerCase() === 'post') {
        xhr.open(opts.type, opts.url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(dataStr);
    }
    if (opts.type.toLowerCase() === 'get') {
        xhr.open(opts.type, opts.url + '?' + dataStr, true);
        xhr.send();
    }
}
function createAjax(){//看课件似乎是有的老的浏览器不支持原生创建
    if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{  
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");  
        }catch(e){  
            xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");  
        }  
        return xmlHttpRequest;  
    }
    else{
    	return null;
    }  
}  