/**
 * Created by Administrator on 2016/5/15.
 */
/**
 * 瀑布流
 * $ct 将要设置的元素集合的父元素
 * listArr : 列高度数组
 * @type {{init: WeaterFuil.init, setCss: WeaterFuil.setCss, findMin: WeaterFuil.findMin}}
 */


var Weaterfall = {
    init:function ($ct,listArr) {
        this.$ct = $ct;
        this.$nodes = $ct.find('.item');
        console.log(this.$nodes);
        this.nodeW = this.$nodes.outerWidth(true);
        this.listArr = listArr;

        this.initArr();
        this.setCss();


    },
    initArr:function () {
        var me = this;
        var len = me.listArr.length;

        if (len == 0) {            //初次使用列高度数组，全部初始化为0
            var colNum = parseInt(me.$ct.width() / me.$nodes.outerWidth(true));
            for (var i=0; i<colNum ; i++){
                me.listArr.push(0);
            }
        }
    },
    setCss:function () {
        var me =this;

        me.$nodes.each(function (index, el) {
            me.findMin();
            var $cur = $(this);
            $cur.css({
                left: me.nodeW * me.idx,
                top:me.min
            });
            me.listArr[me.idx] += $cur.outerHeight(true);

        });
    },
    findMin:function () {
        var me = this;
        me.min = me.listArr[0];
        me.idx = 0;

        for (var key in me.listArr){
            if (me.listArr[key] < me.min) {
                me.min = me.listArr[key];
                me.idx = key;
            }
        }
    }
};