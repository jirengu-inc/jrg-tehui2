/**
 * Created by Administrator on 2016/5/15.
 */
/**
 * 如果 给定的元素 $target 可见，则执行函数 handler（this）
 * 若，$target 有多个元素组成，则为每个可见元素执行 handler(this),this:当前元素
 * @type {{init: Exposure.init, bind: Exposure.bind, checkVisable: Exposure.checkVisable, isVisable: Exposure.isVisable}}
 */
var Exposure = {
    init:function ($target,handler) {
        this.$target = $target;
        this.handler = handler;
        this.$win = $(window);

        this.bind();
        this.checkShow();
    },
    bind:function () {      //绑定事件
        var me = this;
        var clock = null;
        var delayTime = 300;

        this.$win.on("scroll",function (e) {
            clock && clearTimeout(clock);
            clock = setTimeout(function () {
                me.checkShow();
            },delayTime);
        });
    },
    checkShow:function () {    //如果可见 执行回调函数，handler()
        var me = this;
        me.$target.each(function () {
            var $cur = $(this);
            if (!me.isDone($cur)) return; //如果上次事件未执行完毕，直接跳过
            if (me.isShow($cur)){
                console.log("调用了函数");
                me.handler && me.handler.call(this,this);//作用域、参数 为当前元素，$cur
            }
        });
    },
    isShow:function ($node) {
        return this.$win.height() + this.$win.scrollTop() > $node.offset().top ;
    },
    isDone:function ($node) {
        console.log("isDone:" + $node.data("isDone"));
        return $node.data("isDone");
    }
};