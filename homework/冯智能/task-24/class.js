//Class的添加和移除
var addClass=function(data,cls){
  var str=data.className;
  var tem=str.split(" ");
  if(tem.indexOf(cls)!==-1){
    return false;
  }else if(tem==""){
        data.className=cls;
  }else{
    var ele=tem.push(cls);
      data.className=tem.join(" ");
  }
};
//移除
function removeClass(el, cls) {
    var str = el.className;
    if (str.search(cls) === -1) {
    } else {
        var tmp = el.className.split(" ");
        var index = tmp.indexOf(cls);
        tmp.splice(index, 1);
        el.className = tmp.join(" ");

    }
}
