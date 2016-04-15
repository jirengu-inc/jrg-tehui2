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
    }else if(xml.readyState===4 && xml.status===404){
      opts.error();
    }
  }
}
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
