/**
 * Created by ran on 2016/4/13.
 */
var tools = {
    hasClass:function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        if( ele.className.match(reg) ){
            return true;
        }else{
            return false;
        }
    },

    addClass:function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                tools.singleAddClass(ele[i],cls);
            }
        }else{
            tools.singleAddClass(ele, cls);
        }
    },

    removeClass:function(ele,cls){
        if(ele.length > 0){
            for(var i = 0;i<ele.length;i++){
                tools.singleRemoveClass(ele[i],cls);
            }
        }else{
            tools.singleRemoveClass(ele,cls);
        }
    },

    singleAddClass:function(ele,cls){
        if(tools.hasClass(ele,cls)){
            return true;
        }
        ele.className += ' '+cls;
    },

    singleRemoveClass:function(ele,cls){
        var reg = new RegExp('\\b'+cls+'\\b');
        ele.className = ele.className.replace(reg,'');
    },
    indexOf:function(ele){
        var parent = ele.parentElement,
            broEle = parent.children;
        for(var i=0; i<broEle.length;i++){
            if(ele === broEle[i]){
                return i;
            }
        }
        return -1;
    }
};

var ul = document.querySelector('.tabs');

ul.addEventListener('click',function(e){
    var target = e.target,
        li = ul.children,
        i = tools.indexOf(target),
        panels = document.querySelectorAll('.panel');

    if(i > -1){
        tools.removeClass(li,'active');
        tools.addClass(target,'active');
        tools.removeClass(panels,'active');
        tools.addClass(panels[i],'active');
    }
});
