//Tips:
//0.使用方法为 TabChange.init($target,'.tab-mod','.panel');
//1.适合有多个tab切换的时候,每个tab的class为tab-mod,然后下面展示内容的容器class为panel;
//2.$target为频道切换按钮,无比将其全部找到,要不然index就无法运作;
//3.active为激活样式,需要你自己写,$target主要是颜色变化,panel的激活就是display:block

var TabChange = {
    init:function($target,parent,panel){
        this.$target = $target;
        this.parent = parent;
        this.panel = panel;
        this.bind();
    },
    bind:function(){
        var _this = this;
        this.$target.on('click',function(e){
            var $cur = $(this),
                index = $cur.index();
            $cur.siblings().removeClass('active');
            $cur.addClass('active');
            $cur.parents(_this.parent).find(_this.panel).removeClass('active');
            $cur.parents(_this.parent).find(_this.panel).eq(index).addClass('active');
        })
    }
};
