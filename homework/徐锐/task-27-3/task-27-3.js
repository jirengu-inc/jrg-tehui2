$(function () {

    var $imgCt = $('.img-ct');
    var $pre = $('.pre');
    var $next = $('.next');
    var $img = $imgCt.find('img');
    var $item = $imgCt.children();
    var $bul = $('.bullet');
    var ready = false;
    var curidx = 0;
    var imgWidth = $img.width();

    $imgCt.append($item.first().clone());
    $imgCt.prepend($item.last().clone());
    $imgCt.css('left',0-imgWidth);
    $imgCt.css('width', imgWidth * $imgCt.children().length); // 注意这个地方如果把$imgCt.children()换成$item宽度只有4个宽


    $next.on('click',function () {
        toNext();
    });
    $pre.on('click',function () {
        toPre();
    });

    $bul.find('li').on('click',function () {
        var idx = $(this).index();
//            console.log($(this).index())
        if(idx > curidx){
            toNext(idx - curidx); // 设置idx = idx - curidx，然后toNext(idx)会导致错误
        } else if(idx < curidx){
            toPre(curidx - idx);
        }
    });

    $('.carousel').on('mouseover',function () {
        $('.arrow').css('display','block');
    }).on('mouseleave',function () {
        $('.arrow').css('display','none');
    });

    function toNext(idx) {
        var idx = idx || 1;
        if(!ready) {
            ready = true;
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

    function autoChange() {
        setInterval(function () {
            toNext();
        },4000);
    }

    autoChange();


    function toLocation() {
        $bul.find('li').removeClass('active').eq(curidx).addClass('active');
    }
});

// 需要注意的问题：
// 包含图片的ul中item的个数问题，因为有两个是克隆生成的。所以注意什么时候需要用6个（$imgCt.children().length），什么时候需要用4个($item.length)
// 注意toNext函数和toPre函数中的判断条件（什么时候重置ul）
// 注意处理重复点击的问题（加锁，将代码放在锁中）


// 需要思考的难点:
// 1. 如何实现无限循环？以及代码的实现（首尾添加克隆元素，障眼法）
// 2. 如何将当前显示的图片和下面表示位置的圆点对应起来（通过idx和curidx来控制）


// 思想：
// 通用方法尽可能封装成函数，使整个流程可以被掌控
// 重视代码的复用性，比如未在css中直接设置ul的宽度，而是选择通过js控制
