/**
 * Created by Yakumo on 16/5/19.
 */
//Tips: 
//     1.speed参数是回到顶部的速度，不设置的话就是400ms；
//     2.right是本按钮相对于览器窗口右边的位置，不设置的话就是5%；
//     3.top是本按钮相对于浏览器窗口顶部的位置，不设置的话就是90%；
define(['jquery'],function($){
    var GoTop = {
        init: function(speed,right,top){
            if($('.goTop').length > 0) return;
            var $goTop =$('<a class="goTop" href="#">Top</a>');
            $('body').append($goTop);
            this.speed = speed||400;
            this.right = right||'5%';
            this.top = top||'85%';
            this.$goTop= $goTop;
            this.bind();
            this.render();
        },
        bind: function(){
            var _this = this;
            $(window).on('scroll', function(e){
                var offsetTop = $(window).scrollTop();
                if(offsetTop>300){
                    _this.$goTop.show(400);
                }else{
                    _this.$goTop.hide(400);
                }
            });
            this.$goTop.on('click', function(){
                $('body').animate({
                    scrollTop:0
                },_this.speed);
            });
        },
        render:function(){
            var _this = this;
            _this.$goTop.css({
                display:'none',
                position: 'fixed',
                color: '#fff',
                right:_this.right,
                top:_this.top,
                'border-radius': '50%',
                'height': '100px',
                'width':'100px',
                'font-size': '30px',
                'line-height':'100px',
                'text-align':'center',
                'background-color':'rgba(52, 52, 52, .4)',
                'z-index':'7'
            })
        }
    };
    return GoTop;
});

