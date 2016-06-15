function ajax(opts) {

opts.type = opts.type || 'get';
opts.data = opts.data || {};
opts.success = opts.success || function(){};
opts.error = opts.error || function(){};
opts.dataType = opts.dataType || 'json';

var xmlhttp = new XMLHttpRequest();
var str = '';
for(var key in opts.data){
	str += key +'='+ opts.data[key] + '&';
}
	str = str.substr(0,str.length-1);
	if (opts.type.toLowerCase() === 'post') {
		xmlhttp.open(opts.type,opts.url,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(str);
	}
	if (opts.type.toLowerCase() === 'get') {
		opts.url = opts.url+"?"+str;
		xmlhttp.open(opts.type,opts.url,true);
		xmlhttp.send();
	}
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.status === 200&&xmlhttp.readyState === 4) {
			if (opts.dataType === 'text') {
				opts.success(xmlhttp.responseText);
			}
			if (opts.dataType === 'json') {
				var json = JSON.parse(xmlhttp.responseText);
				opts.success(json);
			}
		}
	
	else{
			// opts.error();
	}
};

}