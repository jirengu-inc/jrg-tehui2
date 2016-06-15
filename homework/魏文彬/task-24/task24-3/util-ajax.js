function ajax(opts){
       var xhr;
       if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest(); 
       }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");  
       }
      

       xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 & xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);  
            opts.success(json);  
        }else{
            opts.error();
        }
       }

     var dataStr = '';
     for(var key in opts.data){
        dataStr += key + '=' + opts.data[key] + '&';  
     }
     dataStr = dataStr.substr(0,dataStr.length-1); 

     if (opts.type.toLowerCase() === 'get') {
        xhr.open(opts.type,opts.url + '?' + dataStr,true);
        xhr.send();
     }
     if (opts.type.toLowerCase() === 'post') {
        xhr.open(opts.type,opts.url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xhr.send(dataStr);
     }
}
