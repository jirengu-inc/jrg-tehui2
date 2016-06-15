    function ajax(opts){
    var xhr = new XMLHttpRequest();
    var dataStr = '';
    for(var key in opts.data) {
        dataStr += key + '='+opts.data[key]+'&';
    }
    dataStr = dataStr.substr(0,dataStr.length-1); //去掉最后的&

    if(opts.type.toLowerCase() === 'get') {
        xhr.open(opts.type,opts.url+'?'+dataStr,true);
        xhr.send();
    }
    if(opts.type.toLowerCase() === 'post') {
        xhr.open(opts.type,opts.url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(dataStr);
    }
    xhr.onreadystatechange = function() {
        if(xhr.status == 200 && xhr.readyState == 4) {
            var json = JSON.parse(xhr.responseText);
            opts.success(json);
        }
        if(xhr.status == 404 && xhr.readyState == 4) {
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