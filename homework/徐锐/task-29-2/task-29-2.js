$(function () {

    $(window).on('scroll',function () {
        var $img = $('img');

        setTimeout(function () {
            for(var i=1; i<$img.length; i++){
                if($img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())){
                    if($img.eq(i).attr('src') == '' || 'http://7xrart.com1.z0.glb.clouddn.com/Loading_icon.gif'){
                        var lazyloadsrc = $img.eq(i).attr("data-src");
                        $img.eq(i).attr("src",lazyloadsrc);
                    }
                }
            }
        },1000);
    })

});