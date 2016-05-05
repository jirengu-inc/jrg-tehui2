$(function () {

    // Ⅰ：没有理解定时器的作用
    // $(window).on('scroll',function () {
    //     var $img = $('img');
    //
    //     setTimeout(function () {
    //         for(var i=1; i<$img.length; i++){
    //             if($img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())){
    //                 if($img.eq(i).attr('src') == '' || 'http://7xrart.com1.z0.glb.clouddn.com/Loading_icon.gif'){
    //                     var lazyloadsrc = $img.eq(i).attr("data-src");
    //                     $img.eq(i).attr("src",lazyloadsrc);
    //                 }
    //             }
    //         }
    //     },1000);
    // })




    // Ⅱ：稍微优化版
    // var clock;
    // $(window).on('scroll',function () {
    //     if(clock){
    //         clearTimeout(clock);
    //     }
    //     clock = setTimeout(function(){
    //         lazyLoad();
    //     }, 500);
    // });
    //
    // function lazyLoad() {
    //
    //     var $img = $('img'),
    //         winH = $(window).height(),
    //         winS = $(window).scrollTop();
    //
    //     for(var i=1; i<$img.length; i++){
    //         if($img.eq(i).offset().top < parseInt(winH) + parseInt(winS)){
    //             if($img.eq(i).attr('src') == '' || 'http://7xrart.com1.z0.glb.clouddn.com/Loading_icon.gif'){
    //                 var lazyLoadSrc = $img.eq(i).attr("data-src");
    //                 $img.eq(i).attr("src",lazyLoadSrc);
    //             }
    //         }
    //     }
    // }



    // Ⅲ：参考老师Demo优化

    (function load() {

        var clock;
        var $img = $('img');


        bind();

        // 每500毫秒监听一次滚动事件，优化性能
        function bind() {
            $(window).on('scroll', function(){

                if(clock){
                    clearTimeout(clock);
                }
                clock = setTimeout(function(){
                    lazyLoad();
                }, 500);

            });
        }


        function lazyLoad(){
            $img.each(function(){
                var $cur = $(this);
                if($cur.attr('isLoaded')){
                    return;
                }

                if(isShow($cur)){
                    showImg($cur);
                }
            });
        }

        function isShow($el){
            var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                top = $el.offset().top;

            if(top < winH + scrollH){
                return true;
            }else{
                return false;
            }
        }

        // 通过为元素添加自定义属性值来对已经遍历过的元素进行区分，防止重复操作，优化性能
        function showImg($el){
            $el.attr('src', $el.attr('data-src'));
            $el.attr('isLoaded', true);
        }

    })();


});