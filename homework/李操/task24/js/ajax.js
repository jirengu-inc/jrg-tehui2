var xmlhttp = false;

function ajax(opts) {
    //跨浏览器创建xhr对象
    xmlhttp = false;
    if (window.XMLHttpRequest) { //现代浏览器
        xmlhttp = new XMLHttpRequest();
        if (xmlhttp.overrideMimeType) { //设置MIME类别，针对某些特定版本的mozillar浏览器的BUG进行修正
            xmlhttp.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { //IE5,6
        try {
            xmlhttp = new ActiveXObject("Msxm12.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!xmlhttp) { //异常，创建xhr对象实例失败
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }


    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            opts.success(json);
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
            opts.error();
        }
    }

    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
    }
    // dataStr = dataStr.substr(0,dataStr.length-1);
    dataStr = dataStr.replace(/&$/g, '');

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