/**
 * Created by ran on 2016/5/5.
 */
    //试着将原来最简单的goTop用这种格式写出来，感觉这种写法把要做的事情都分类一块一块放着，
    //都是围绕着外面这个GoTop有那些属性，有哪些方法，传统的话在过程复杂的时候就乱了，
    //每一个步骤都有可能需要不同的绑定
    //我回去把原来stick也用这种写法给写一下，争取把TASK32也用这种写法写出来
var GoTop = {
    init: function(){
        if($('.goTop').length > 0) return;
        var $goTop =$('<a class="goTop" href="#">Top</a>');
        $('.wrap').append($goTop);

        this.$goTop= $goTop;
        this.bind();
        this.render();
    },
    bind: function(){
        var self = this;
        $(window).on('scroll', function(e){
            var offsetTop = $(window).scrollTop();
            if(offsetTop>100){
                self.$goTop.show(400);
            }else{
                self.$goTop.hide(400);
            }
        });
        this.$goTop.on('click', function(){
            $(window).scrollTop(0);
        });
    },
    render:function(){
        var me = this;
        me.$goTop.css({
            'display':'none',
            'position': 'fixed',
            'color': 'red',//这里为什么字体就是没有颜色呢？
            'right':'5%',
            'top':'85%',
            'height': '60',
            'width': '60',
            'line-height': '60',
            'border-radius': '50%',
            'padding': '20',
            'font-size': '30',
            'background-color':'rgba(52, 52, 52, .4)',
            'z-index':'7'
        })
    }
};
