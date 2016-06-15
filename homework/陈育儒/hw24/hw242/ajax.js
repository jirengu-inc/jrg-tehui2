  function ajax(opts){
    var xmlhttp = new XMLHttpRequest();//新建一个对象
    var str = "";//设置一个空字符串用作字符串串接url用
    for(var key in opts.data){
       str = str + key +"="+ opts.data[key]+'&';//遍历对象里面的值，并串接起来
    }
    str = str.substring(0,str.length-1);//将字符串最后一个 & 删除，获取里面的字符串

    if(opts.type.toLowerCase()==="get"){//如果type为 GET，用这种方式
       xmlhttp.open(opts.type,opts.url+"?"+str,true);
       xmlhttp.send();
    }

    if(opts.type.toLowerCase()==="post"){
       xmlhttp.open(opts.type,opts.url,true);//如果type为 POST,用这种方式
       xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
       xmlhttp.send();
    }

    xmlhttp.onreadystatechange = function(){
          if(xmlhttp.readyState==4 && xmlhttp.status==200){
//如果数据交换完成和请求成功（200），执行下面的语句
             var json = JSON.parse(xmlhttp.responseText);
             opts.success(json);
          }
        
          else if(xmlhttp.readyState==4 && xmlhttp.status ==404){
//如果数据交换成功同时请求失败404，执行下面的语句
             opts.error();
          }
     }
}