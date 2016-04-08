$(function () {
    
    $.fn.stick = function () {

        var $cur = this,
            curWidth = $cur.width(),
            curTop = $cur.offset().top,
            curLeft = $cur.offset().left;

        // 为将要调用stick方法的元素克隆出一个新的透明元素作为占位元素，防止文档流错位
        var newNode = $cur.clone().css('opacity',0).insertBefore($cur).hide();

        // 监听窗口滚动，根据滚动距离来决定吸顶条display
        $(window).on('scroll',function () {
            if( $(this).scrollTop() > curTop ){
                setFixed();
            } else {
                unsetFixed();
            }
        });


        function setFixed(){
            $cur.css({
                position: 'fixed',
                top: 0,
                left: curLeft,
                width: curWidth,
                'z-index': 99,              //  很重要
                margin: 0
            });
            newNode.show();
        }


        function unsetFixed(){
            $cur.removeAttr('style');
            newNode.hide();
        }

    };


    $('.nav').stick();
    
});