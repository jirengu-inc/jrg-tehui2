
function hasClass(el,cls){
	var reg= new RegExp('\\b'+cls+'\\b','g');
	return !!el.className.match(reg);//有匹配的返回true
}

function singleAddClass(el,cls){
	if(hasClass(el,cls)){
		return
	}
	else{
		el.className += ' '+cls;
	}
}

function singleRemoveClass(el,cls){
	var reg= new RegExp('\\b'+cls+'\\b','g');
	el.className = el.className.replace(reg,'');
}

function addClass(el,cls){
	if(el.length && el.length>0){
		for(var i=0;i<el.length;i++){
			singleAddClass(el[i],cls);
		}
	}
		else{
			singleAddClass(el,cls);
		}
}

function removeClass(el,cls){
	if(el.length && el.length>0){
		for(var i =0;i<el.length;i++){
			singleRemoveClass(el[i],cls);
		}
	}
	else{
		singleRemoveClass(el,cls);
	}
}