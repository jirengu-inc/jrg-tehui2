function ajax(opts){
  var xml=new XMLHttpRequest();
  var arr="";
  for (var key in opts.date){
  arr+=(key+"="+opts.date[key]+"&")
  }
  arr=arr.replace(/&$/,"");
  // arr = dataStr.substr(0,dataStr.length-1);

  if(opts.type.toLowerCase()==="get"){
    xml.open(opts.type,opts.url+"?"+arr,true);
    xml.send();
  }

  if(opts.type.toLowerCase()==="post"){
    xml.open(opts.type,opts.url,true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.send(arr);
  }
  xml.onreadystatechange=function(){
    if(xml.readyState===4 && xml.status===200){
      var json = JSON.parse(xml.responseText);
      opts.success(json);
      // console.log(json);
    }else if(xml.readyState===4 && xml.status===404){
      opts.error();
    }
  }
}
function ajaxname(){
      ajax({
        url:"ajax.php",
        type:"post",
        date:{
          "name":username.value
        },
        success:function(data){
          onSuccess(data);
        },
        error:function(){
          onError();
        }
      })
}

function onSuccess(data){
  if(data ===0){
  nametip.innerText=username.value+"已经存在，再换个用户名吧"
  addClass(username,"error");
  return false;
}else if(data ===1){
    nametip.innerText=username.value+"可以使用！"
    removeClass(username,"error");
    return true;
}
}

function onError(){
  console.log("出错了！")
}
