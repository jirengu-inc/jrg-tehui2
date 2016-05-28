/**
 * Created by Administrator on 2016/5/28.
 */

define(['jquery'],function($){
    var Exposure = function($target,handler) {

        this.$target = $target;
        this.handler = handler;

        this.bind();
    };
    Exposure.prototype.bind = function () {
        var me = this;
        var clock;
        $(window).on('scroll',function(e){
            clock && clearTimeout(clock);
                clock = setTimeout(function () {
                me.$target.each(function (index, elem) {
                    var temp = $(this);
                    if (isVisible(temp)){
                        console.log("可见");
                        temp.css('opacity',1);
                    } else {
                        temp.css('opacity',0);
                        console.log("不可见");
                    }
                });
            },100);
        });


        function isVisible($node){
            return $(window).scrollTop() + $(window).height() > $node.offset().top;
        }
    };

    return Exposure;
});