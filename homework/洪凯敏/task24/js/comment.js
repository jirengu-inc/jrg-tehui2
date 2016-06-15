/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-05 20:53:45
 * @version $Id$
 */
var Utils={
	trim:function(str){
		if(str){
			return str.replace(/^\s+|\s+$/g,"");
		}
		return str;
	},
	hasClass:function(node,str){
		if(node.className){
			var reg=new RegExp("\\b"+str+"\\b","g");
			return Boolean(node.className.match(reg));
		}
		return false;
	},
	addClass:function(node,str){
		if(!this.hasClass(node,str)){
			var org=node.className;
			node.className=org+" "+str;
		}
		return node.className;
	},
	removeClass:function(node,str){
		if(this.hasClass(node,str)){
			var reg=new RegExp("\\b"+str+"\\b","g");
			node.className=this.trim(node.className.replace(reg,""));
		}
		return node.className;
	},
	insertAfter:function(newElement,targetElement){
		var parent =targetElement.parentNode;
		if(parent.lastChild == targetElement){
			parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibling);
		}
	},
	addLoadEvent:function(func){
		var oldonload=window.onload;
		if(typeof window.onload != 'function'){
			window.onload=func;
		}else{
			window.onload=function(){
				oldonload();
				func();
			}
		}
	}
}
