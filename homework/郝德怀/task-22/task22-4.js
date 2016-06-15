//工具封装：
var hasClass=function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        if( ele.className.match(reg) ){
            return true;
        }else{
            return false;
        }
    },

    addClass=function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                singleAddClass(ele[i],cls);
            }
        }else{
            singleAddClass(ele, cls);
        }
    },

    removeClass=function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                singleRemoveClass(ele[i],cls);
            }
        }else{
            singleRemoveClass(ele,cls);
        }
    },

    singleAddClass=function(ele,cls){
        if(hasClass(ele,cls)){
            return true;
        }
        ele.className += ' '+cls;
    },

    singleRemoveClass=function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        ele.className = ele.className.replace(reg,'');
    },

    indexOf=function(ele){
        var parent = ele.parentElement,
            broEle = parent.children;
        for(var i=0; i<broEle.length;i++){
            if(ele === broEle[i]){
                return i;
            }
        }
        return -1;
    }

//核心代码：
ul=document.querySelector('.tabs');

ul.addEventListener('click',function(e){
    li=ul.children;
    i=indexOf(e.target);
    contents=document.querySelectorAll('.content');

    removeClass(li,'active');
    addClass(e.target,'active');
    removeClass(contents,'active');
    addClass(contents[i],'active');

})