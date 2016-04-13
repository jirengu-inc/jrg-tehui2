/**
 * Created by ran on 2016/4/13.
 */
var btnLogin = document.querySelector('#btn-login'),
    wrap = document.querySelector('#wrap'),
    loginWindow = document.querySelector('.loginWindow');

function showWindow(wrap){
    wrap.style.display = 'block';
}
function hideWindow(wrap){
    wrap.style.display = 'none';
}
function hasClass (ele, cls){
    var reg=new RegExp('\\b'+cls+'\\b');
    if(ele.className.match(reg)){
        return true
    }else{
        return false
    }
}


btnLogin.addEventListener('click', function(e){
    showWindow(wrap);
    e.stopPropagation();
});
loginWindow.addEventListener('click', function(e){
    if( hasClass(e.target,'close')||hasClass(e.target,'btn-cancel') ){
        hideWindow(wrap);
    }//如果想确定也可以hide就加一个 ||hasClass(e.target,'btn-confirm')
    e.stopPropagation();
});
document.body.addEventListener('click', function(){
    hideWindow(wrap);
});