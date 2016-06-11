function ajax(opts){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState==4 && xhr.status==200){
      if(opts.dataType.toLowerCase()=='json'){
        var json=JSON.parse(xml.responseText);
        opts.success(json);
      }
      if (opts.dataType.toLowerCase()=='text') {
        opts.success(xml.responseText);
      }
    }
    if(xml.status==404){
      opts.error();
    }
  }
  var dataStr = '';
  for(k in opts.data){
    dataStr += k + '=' + opts.data[k] + '&';
  }
  dataStr=dataStr.substr(0,dataStr.length-1);
  if(opts.type.toLowerCase()=='get'){
    xml.open(opts.type,opts.url+'?'+dataStr,true);
    xml.send;
  }
  if(opts.type.toLowerCase()=='post'){
    xml.open(opts.type,opts.url,true);
    xml.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xml.send();
  }
}
document.querySelector('#btn').addEventListener('click',function(){
  ajax({
    url:'getData.php',
    type:'get',
    data:{
      username:'xiaoming',
      password:'abcd1234'
    }，
    success:function(ret){
      console.log(ret);
    },
    error:function(){
      console.log('出错了')
    }
  })
});
