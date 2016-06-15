var Mark = {
    init:function($target,mark){
        this.$target= $target;
        this.$ct = this.$target.parents('.list-ct');
        this.mark = mark;
        this.bind();
    },
    bind:function(){
        var _this = this;
        $(this.$ct).on('click',function(e){
            if(e.target.tagName.toLowerCase() ==='li'){
                var $cur = $(e.target),
                    index = $cur.index();
                $cur.siblings().find(_this.mark).css('opacity','0');
                $cur.find(_this.mark).css('opacity','0.8');
            }else if(e.target.tagName.toLowerCase() ==='a'){
                var $cur = $(e.target),
                    index = $cur.index();
                $cur.parents('.music-type').siblings().find(_this.mark).css('opacity','0');
                $cur.find(_this.mark).css('opacity','0.8');
            }
        })
    }
};
