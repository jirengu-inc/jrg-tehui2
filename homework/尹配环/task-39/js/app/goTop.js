/**
 * Created by Administrator on 2016/5/28.
 */

define(['jquery'],function($){

    var GoTop = function () {

        var me =this;
        this.$node = rander();
        bind();

        function bind(){
            me.$node.on('click',function (e) {
                e.preventDefault();
                $(window).scrollTop(0);
            });
            $(window).on('scroll',function (e) {
                if ($(window).scrollTop()>600){
                    me.$node.fadeIn();
                } else {
                    me.$node.fadeOut();
                }
            })
        }
        function rander(){
            var temp = "";
            temp += '<a href="#" id="goTop" class="fa-stack">';
            temp +=     '<i class="fa fa-square fa-stack-2x"></i>';
            temp +=     '<i class="fa fa-arrow-up fa-stack-1x fa-inverse"></i>';
            temp += '</a>';

            $node = $(temp);
            $node.css({
                position:'fixed',
                right:10,
                bottom:10,
                fontSize: '2rem',
                display:'none'
            });

            $('body').append($node);
            return $node;
        }
        
    };
    return GoTop;
});




