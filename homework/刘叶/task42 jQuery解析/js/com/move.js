//Tips:
    //  1.实现了拖拽功能,使用方法为: Move.init($node,opcity);
    //  2.接受两个参数,第一个为你想拖拽的元素,第二个为透明度,不设置的话默认为1;
var Move = {
    init:function($node,opacity){
        this.$node = $node;
        this.opacity = opacity||'1';
        this.$node.css('position','absolute');
        this.bind();
    },
    bind:function(){
        var _this = this;
        this.$node.on('mousedown',function(e){
            _this.$node.css({
                opacity:_this.opacity,
                cursor:'move'
            });
            _this.isDown = true;//状态锁
            _this.$node.realX = e.pageX - _this.$node.offset().left;
            _this.$node.realY = e.pageY - _this.$node.offset().top;
        });
        this.$node.on('mouseup',function(){
            _this.$node.css({
                opacity:'1',
                cursor:'auto'
            });
            _this.isDown = false;//状态锁
        });
        //至于为什么不是this.$node,因为这样鼠标跑出了对象,对象就跟不上鼠标了
        $(document).on('mousemove',function(e){
            if(_this.isDown){
                _this.$node.css({
                    top: e.pageY - _this.$node.realY,
                    left: e.pageX - _this.$node.realX
                })
            }
        });
    }
}