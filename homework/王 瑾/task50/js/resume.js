var carousel = $(".carousel ul"),
    unit = carousel.children(),
    nav = $(".nvbar"),
    navli = nav.children(),
    curIdx = 0,
    oHeight = unit.outerHeight(true),
    gotop = $(".gotop"),
    page2 = $(".page2"),
    icon = gotop.find("img"),
    isRolled = false;

navli.on("click",function(e){
	e.stopPropagation();
    nav.children().removeClass("active");
    $(this).addClass("active");
    idx = $(this).index();
    if(idx>curIdx){
    	playNext(idx-curIdx);
    }else if(idx<curIdx){
    	playPre(curIdx-idx);
    }
});

function playNext($idx){
	carousel.animate({
		"top":"-="+$idx*oHeight
	},function(){
		curIdx += $idx;
	});
}

function playPre($idx){
	carousel.animate({
		"top": "+="+$idx*oHeight
	},function(){
		curIdx -= $idx;
	});
}

gotop.on("click",function(){
    if(!isRolled){
        icon.css("animation","rollover .8s linear .1s forwards");
        page2.css("animation","slideup .8s linear .1s forwards");
        isRolled = true;
    }else if(isRolled){
        icon.css("animation","rollback .8s linear forwards");
        page2.css("animation","slidedown 1s linear .2s forwards");
        isRolled = false;
    }
});