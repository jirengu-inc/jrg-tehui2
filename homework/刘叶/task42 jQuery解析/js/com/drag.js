var drag = function() {
    $(this).each(function() {
        var _this = $(this);
        _this.css('position','absolute');
        var isMoved = false;
        var nodeX, nodeY;
        //这里用_this保存this,就是让_this指向被jquery选中的DOM,也就是我们的对象
        _this.on("mousedown", function(event) {
            isMoved = true;
            nodeX = event.pageX - _this.offset().left;
            nodeY = event.pageY - _this.offset().top;
            _this.css("cursor", "move");
        });
        //把监听放到document上,解决了鼠标跑超出去了,结果对象就跟丢了鼠标
        $(document).on("mousemove", function(event) {
            if (isMoved) {
                var eX = event.pageX;
                var eY = event.pageY;
                var wX = $(window).width();
                var wY = $(window).height();
                var thisX = _this.width();
                var thisY = _this.height();
                var thisMarginLeft = _this.offset().left;
                var nowX = eX - nodeX;
                var nowY = eY - nodeY;
                var left, top;
                //下面这一堆解决了万一东西被人拖跑出了边界怎么办的问题
                var thisLeft = (thisMarginLeft > 0) ? 0 : (-thisMarginLeft);
                if (nowX < thisLeft) {
                    left = thisLeft;
                } else if (nowX > wX - thisX + thisLeft) {
                    left = wX - thisX + thisLeft;
                } else {
                    left = nowX;
                }
                if (nowY < 0) {
                    top = 0;
                } else if (nowY > wY - thisY) {
                    top = wY - thisY;
                } else {
                    top = nowY;
                }
                _this.css({
                    "left": left,
                    "top": top
                });
            }
        }).on("mouseup", function() {
            isMoved = false;
            _this.css("cursor", "auto");
        });
    });
};
// 添加到 jQuery 中
jQuery.fn.extend({drag: drag});