$(function () {

    var $imgCt = $('.img-ct');
    var $pre = $('.pre');
    var $next = $('.next');
    var $bul = $('.bullet');

    var imgLen = $imgCt.children().length;

    var curidx = 0;
    var ready = false;



    $next.on('click',function () {
        toNext();
    });
    $pre.on('click',function () {
        toPre();
    });
    $bul.find('li').on('click',function () {
        var idx = $(this).index();
        // curidx = $idx % $imgCt.children().length;
        change(idx);
    });

    change(0);

    autoChange();

    function toNext() {
        change((curidx+1) % imgLen);
    }
    function toPre() {
        change((curidx + imgLen -1) % imgLen);
    }

    $('.carousel').on('mouseover',$imgCt,function () {
        $('.arrow').css('display','block');
    }).on('mouseleave',$imgCt,function () {
        $('.arrow').css('display','none');
    });

    function change(idx) {
        if(ready) {
            return
        }
        ready = true;
        $imgCt.find('img').eq(curidx).fadeOut(300);
        $imgCt.find('img').eq(idx).fadeIn(600,function () {
            ready = false;
        });
        curidx = idx;
        toLocation();
    }


    function autoChange() {
        setInterval(function () {
            toNext();
        },4000);
    }

    function toLocation() {
        $bul.find('li').removeClass('active').eq(curidx).addClass('active');
    }

});