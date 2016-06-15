/**
 * Created by ran on 2016/4/27.
 */
$.fn.stick=function(){
    var $cur = this,
        curH = $cur.height(),
        curW = $cur.width(),
        setLeft = $cur.offset().left,
        setTop = $cur.offset().top;

    var $cloneCur = $cur.clone().css('opacity',0).insertBefore($cur).hide();

    $(window).on('scroll',function(){
        var scrollTop = $(this).scrollTop();
        if(scrollTop>= setTop){
            if(!isFixed()){
                setFixed();
            }
        }else{
            if(isFixed()){
                unsetFixed();
            }
        }
    });

    function isFixed(){
        return !!$cur.attr('position-fixed');
    }

    function setFixed(){
        $cur.attr('position-fixed',true)
            .css({
                'position':'fixed',
                'top':0,
                'z-index':7,
                'width':curW,
                //left:offsetLeft,这句话我现在又恨又爱
                'height':curH,
                'margin':0
            });
        $cloneCur.show();
    }

    function unsetFixed(){
        $cur.removeAttr('position-fixed').removeAttr('style');
        $cloneCur.hide();
    }
    $(window).resize(function(){
        var curLeft = $cur.offset().left,
            curTop = $cur.offset().top;
    });
    //这里我想，resize是我在看api的时候看到的，就是针对窗口的变化的，
    //因为我手贱拉动浏览器的时候发现了问题，我认为恰到就是因为参数被固定了
    //进入浏览器的一瞬间获取的值，把偏移和宽度都固定了，并不能实时更新，
    //这里我先提交上来，等下班有时间再回来能否解决这个问题
};
