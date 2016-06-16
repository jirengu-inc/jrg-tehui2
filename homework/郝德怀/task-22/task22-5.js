    //tools：
    function hasClass(ele,cls){
        return !!ele.className.match(new RegExp('\\b'+cls+'\\b'));
    };

    function hideWrap(a){
        a.style.display = "none";
    };

    function showWrap(a){
        a.style.display = "block";
    };

//key codes
//：
var btn=document.querySelector('button');
    wrap=document.querySelector('.wrap');


    btn.addEventListener('click',function(e){
        e.stopPropagation();
        showWrap(wrap);
    })

    wrap.addEventListener('click',function(e){
        e.stopPropagation();
        if(hasClass(e.target,"cancel") || hasClass(e.target,"close") || hasClass(e.target,"cover")){
        hideWrap(wrap);
        }
    });