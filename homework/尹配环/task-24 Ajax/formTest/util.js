  function ajax(opts){
    var xhr = new XMLHttpRequest(); //创建对象
    //绑定事件
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4 && xhr.status == 200){
          opts.success(JSON.parse(xhr.responseText)); //成功处理函数
          // console.log(xhr.responseText);
      }
      if (xhr.readyState == 4 && xhr.status == 404){
          opts.error();               //失败处理函数
      }
    };
    //组合参数
    var dataStr = "";
    for (var key in opts.data){
      dataStr += key + "=" + opts.data[key] + "&";
    }           
    dataStr.slice(0,dataStr.legend-1);
    //填充并发送
    if (opts.type == "get"){
      xhr.open(opts.type,opts.url + "?" + dataStr,true);
      xhr.send();
    } else if (opts.type == "post") {
      xhr.open(opts.type,opts.url,true);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.send(dataStr);
    }
  }    	


    function hasClass (el,cls) {
        var reg = new RegExp("\\b" + cls + "\\b" , "g");
        return reg.test(el.className);
    }
    function addClass (el,cls) {
        return hasClass(el,cls)?el.className:(el.className += " " + cls);
    }
    function removeClass (el,cls) {
        var reg = new RegExp("\\b" + cls + "\\b" , "g");
        return hasClass(el,cls)?(el.className = el.className.replace(reg,"")):false;
    }






















  