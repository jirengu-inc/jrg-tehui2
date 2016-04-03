$(function () {


    var $ct = $('.img-ct'),
        $next = $('.next'),
        $pre = $('.pre'),
        $bullet = $('.bullet'),
        $carousel = $('.carousel');

    var curIdx = [];
    var ready = false;
    var imgLen = $ct.eq(0).children().length;

    // 左右按钮的显示和隐藏，用闭包解决for循环匿名函数无法调用参数i的问题
    for(var i=0; i<$ct.length; i++){


        function showBtn(i) {
            return function () {
                $($next[i]).css('display', 'block');
                $($pre[i]).css('display', 'block');
            }
        }
        function hideBtn(i) {
            return function () {
                $($next[i]).css('display', 'none');
                $($pre[i]).css('display', 'none');
            }
        }

        $($carousel[i]).on('mouseover', $($ct[i]), showBtn(i))
                       .on('mouseleave', $($ct[i]), hideBtn(i));

    }


    //为左右按钮以及下面一排对应图片的小图标绑定点击事件
    for(var j=0; j<$ct.length; j++){

        curIdx.push(0);

        $($next[j]).on('click',function () {
            var $parent = $(this).parents($ct);
            toNext($parent);
        });
        $($pre[j]).on('click',function () {
            var $parent = $(this).parents($ct);
            toPre($parent);
        });
        $($bullet[j]).find('li').on('click',function () {
            var idx = $(this).index();
            var $parent = $(this).parents($ct);
            change($parent,idx);
        });
    }


    // 定义通用方法
    function toNext(par) {
        var newIdx = par.index();
        change((curIdx[newIdx]+1) % imgLen,par);
    }
    function toPre(par) {
        var newIdx = par.index();
        change((curIdx[newIdx] + imgLen -1) % imgLen,par);
    }


    // 封装核心方法change
    function change(idx,par) {
        var newIdx = par.index();

        var $img = par.eq(0).find(".img-ct li");
        // console.log($img);
        if(ready) {
            return
        }
        ready = true;
        $img.eq(curIdx[newIdx]).fadeOut(300);
        $img.eq(idx).fadeIn(600,function () {
            ready = false;
        });
        curIdx[newIdx] = idx;
        toLocation(par);
    }

    // 将当前图片和下面一排表示位置的小图标对应
    function toLocation(par) {
        var newIdx = par.index();
        var $childLi = par.eq(0).find('.bullet li');
        // console.log(par.eq(0).find('.bullet li'));
        $childLi.eq(curIdx[newIdx]).siblings().removeClass('active');
        $childLi.eq(curIdx[newIdx]).addClass('active');
    }


});