$(function () {

    var $imgCt = $('.img-ct');
    var $item = $imgCt.children();
    var $bul = $('.bullet');

    var ready = false;
    var curidx = 0;
    var imgWidth = $(window).width();

    $imgCt.append($item.first().clone());
    $imgCt.prepend($item.last().clone());
    $imgCt.find('.item').css('width',imgWidth);
    $imgCt.find('.cover').css('width',imgWidth);
    $imgCt.css('left',0-imgWidth);
    $imgCt.css('width', imgWidth * $imgCt.children().length); // 注意这个地方如果把$imgCt.children()换成$item宽度只有4个宽


    $bul.find('li').on('click',function () {
        var idx = $(this).index();
//            console.log($(this).index())
        if(idx > curidx){
            toNext(idx - curidx); // 设置idx = idx - curidx，然后toNext(idx)会导致错误
        } else if(idx < curidx){
            toPre(curidx - idx);
        }
    });

    setImg(1);

    function toNext(idx) {
        var idx = idx || 1;
        if(!ready) {
            ready = true;
            setImg(curidx + 2);
            $imgCt.animate({left: '-=' + imgWidth * idx}, function () {
                curidx = (curidx + idx) % $item.length;
                if(curidx == 0){
                    $imgCt.css({left: 0-imgWidth});
                }
                ready = false;
                toLocation();
            });
        }
    }
    function toPre(idx) {
        var idx = idx || 1;
        if (!ready) {
            ready = true;
            setImg(curidx);
            $imgCt.animate({left: '+=' + imgWidth * idx}, function () {
                curidx = ($item.length+curidx - idx) % $item.length;
                if(curidx == $item.length - 1){
                    $imgCt.css({left: 0-imgWidth * $item.length});
                }
                ready = false;
                toLocation();
            });
        }
    }

    function setImg(idx){
        var idx = idx || 1;
        var $cover = $imgCt.children().eq(idx).find('.cover');
        var imgUrl = $cover.attr('data-bg-img');
        $cover.css('background-image', 'url('+imgUrl+')');
    }

    function autoChange() {
        setInterval(function () {
            toNext();
        },4000);
    }

    autoChange();


    function toLocation() {
        $bul.children().removeClass('active').eq(curidx).addClass('active');
    }

    // 和前面任务中的无限轮播思路大致相同，唯一需要注意的是这里是通过设置背景图片的方式来实现的轮播



});