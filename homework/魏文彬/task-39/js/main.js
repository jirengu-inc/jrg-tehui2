requirejs.config({
    baseUrl:'js/com',
    paths:{
        jquery:'../lib/jquery'
    }
});
requirejs(['jquery', 'goTop', 'waterFall', 'lazyLoad', 'carousel'],function($, GoTop, WaterFall, lazyLoad, Carousel){

    new GoTop(); // 回到顶部

    var waterF=new WaterFall($('#portfolio .imgbox'),$('#portfolio .btn'),3); // 瀑布流布局

    $('#about .timeline').find('li').each(function(){        // 出现后渐显
        lazyLoad($(this));
    })

    new Carousel($('.ct'));    // 全屏轮播

    $(window).on("scroll", function() {
 
        if ($(window).scrollTop() > 200) {
            $("#header").css("backgroundColor", "#222222");
            $("#header .logo").css("fontSize", "20px");
        } else {
            $("#header").css("backgroundColor", "transparent");
            $("#header .logo").css("fontSize", "2em");
        }
    });

    $(window).scroll(function(){  //
            var items = $('.anchor');
            var menu = $('#header ul');
            var top = $(document).scrollTop();
            var currentId = '';
            items.each(function(){
                var me = $(this);
                if(top>me.offset().top-300){
                    currentId='#'+me.attr('id');
                }else{
                    return false;
                }
            })
            var currentLink = menu.find('.current');
            if(currentId && currentLink.attr('href')!=currentId){
                currentLink.removeClass('current');
                menu.find('[href=' + currentId + ']').addClass('current');
            }
    });
});