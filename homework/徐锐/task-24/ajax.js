


function ajax(opts) {

    //处理ajax兼容问题
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    }catch(e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //对传入的data对象进行处理，变成可拼接的字符串
    var data = "";
    for(var key in opts.data) {
        data += key + '=' + opts.data[key]+'&';
    }
    // 解决get方式的乱码问题
    data = encodeURI(data.substr(0,data.length - 1));

    //判断是否为get方式，决定是否拼接url
    if(opts.type.toLowerCase() == 'get' && opts.data) {
        // 解决get方式的缓存问题
        opts.url += '?' + data + '&' + new Date().getTime();
    }

    xhr.open(opts.type,opts.url,true);

    //根据方式不同改变提交格式
    if(opts.type.toLowerCase == 'get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }

    //根据返回数据进行处理
    xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status ==200 ){
                    var oldInfo = xhr.responseText;
                    var newInfo = oldInfo.replace(/<script.*<\/script>$/,"");
                    opts.success(newInfo);
                }else {
                    opts.error(xhr.status);
                }
            }
    }
}