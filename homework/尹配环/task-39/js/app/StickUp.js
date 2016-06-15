/**
 * Created by Administrator on 2016/5/26.
 */

define(['jquery'],function($){
    function StickUp($node){
        this.$node = $node;
        this.$clone = this.$node.clone();
        this.width = this.$node.outerWidth(true);
        this.height = this.$node.outerHeight(true);
        this.top = this.$node.offset().top;
        this.left = this.$node.offset().left;

        this.$clone.css({
            position:'fixed',
            top: 0,
            left:this.left,
            width:this.width,
            height:this.height,
            display:'none'
        });
        this.$clone.css('backgroundColor','#ccc');

        this.$clone.insertBefore(this.$node);

        this.setEvent(300);
    }
    StickUp.prototype.setStickUp = function(){
        if (!this.$clone.data('isFixed')){
            this.$clone.show();
            this.$node.hide();
            this.$clone.data('isFixed',true);
        }

    };
    StickUp.prototype.clearStickUp = function(){
        if (this.$clone.data('isFixed')){
            this.$clone.hide();
            this.$node.show();
            this.$clone.data('isFixed',false);
        }
    };
    StickUp.prototype.setEvent = function(when){
        var when = when || this.top,
            me = this;

        $(window).on('scroll',function(e){
            var winScrollTop = $(window).scrollTop();
            if (winScrollTop >= when) {
                me.setStickUp();
            } else {
                me.clearStickUp();
            }
        });
    };

    return StickUp;
});