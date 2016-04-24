function ajax(opts) {
    var xmlhttp = createAjax();
    if (!xmlhttp) {
        alert("Cannot create an XMLHTTP instance")
        return false;
    }

    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0, dataStr.length - 1);

    xmlhttp.onreadystatechange = function() {
        
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    //为解决SAE实名认证问题增加了3行
                    var rawResponse = xmlhttp.responseText;
                    var fixedResponse = rawResponse.replace(/<script.*<\/script>$/,"");
                    var json = JSON.parse(fixedResponse);
                  //  var json = JSON.parse(xmlhttp.responseText);
                    opts.success(json);
                }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
             opts.error();
        }
    };

    if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dataStr);
    }
    if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
        xmlhttp.send();
    }
}

function createAjax(){
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