/**
 * Created by Administrator on 2016/5/27.
 */
/**
 * $items   瀑布流排放的元素集合
 * listArr  列高度数组  
 */
define(['jquery'],function($){
    var Weaterfall = function ($items,listArr){
        var me = this;

        this.$items = $items;
        this.itemWidth = this.$items.outerWidth(true);
        this.listArr = listArr;
        initArr();

        this.init();

        function initArr (){
            var len = me.listArr.length;
            if (len == 0) {                  ////初次使用列高度数组，全部初始化为0
                var colNum = parseInt(me.$items.parent().width() / me.$items.outerWidth(true));
                for (var i=0; i<colNum ; i++){
                    me.listArr.push(0);
                }
            }
        }
    };
    Weaterfall.prototype.init = function(){
        var me = this;

        me.$items.each(function (index, elem) {
            var $cur = $(elem);
            var thisMin = findMin();

            $cur.css({
                top:thisMin.min,
                left:thisMin.key*me.itemWidth,
                opacity:1
            });
            me.listArr[thisMin.key] += $cur.outerHeight(true);
        });

        function findMin(){
            var min = Math.min.apply(null,me.listArr);
            for (var key in me.listArr) {
                if (me.listArr[key] == min){
                    return {
                        min:min,
                        key:key
                    };
                }
            }
        }
    };


    return Weaterfall;
});