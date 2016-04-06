$(function () {

        var $toTop =  $('.toTop');

        $(window).on('scroll',function () {

            var winHeight = $(window).height(),
                winScroll = $(window).scrollTop();

            if(winScroll + winHeight > 1500){
                $toTop.show();
            } else {
                $toTop.hide();
            }
        });

        $toTop.on('click',function () {
            $(window).scrollTop(0);
        });
    
});