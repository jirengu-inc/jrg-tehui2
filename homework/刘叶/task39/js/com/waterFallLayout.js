/**
 * Created by Yakumo on 16/5/21.
 */
//Tips:
//   0.用法为 waterFall.init($ct,$items),其中$ct为容器,$items为布局目标;
//   1.$ct最好是position:relative、$items的position必须为absolute;
//   2.页面上的图加载好之后,再来使用本布局,否则元素高度获取出错;
//   3.容器高度不需要设置,使用本布局后会自动根据内容更新容器高度;
define(['jquery'],function($){
    var waterFall = {
        init:function($ct,$items){
            this.$ct = $ct;
            this.$items = $items;
            this.heightArr = [];
            this.start();
        },
        start:function (){
            var _this = this;
            this.itemWidth = this.$items.outerWidth(true);
            if(this.$items.length ===0) return;
            this.colNum = Math.floor(this.$ct.width()/this.itemWidth);
            this.$ct.width(this.itemWidth * this.colNum);
            this.heightArr = [];
            for(var i=0;i<this.colNum;i++){
                this.heightArr.push(0);
            }
            this.$items.each(function(){
                _this.place(this);
            });
            _this.$ct.height( Math.max.apply(null, _this.heightArr) );
        },
        place:function($el){
            var idx = 0,
                minSumheight = this.heightArr[0];
            for(var i=0;i<this.heightArr.length;i++){
                if(this.heightArr[i]<minSumheight){
                    idx =i;
                    minSumheight = this.heightArr[i];
                }
            }
            $($el).css({
                left:this.itemWidth*idx,
                top:minSumheight
            });
            this.heightArr[idx]+=$($el).outerHeight(true);
        }
    };
    return waterFall;
});




