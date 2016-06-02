/**
 * Created by Administrator on 2016/6/2.
 */
$.fn.carousel = function(){
    this.each(function(elem,index){

        var _this = $(this);
        var bullet = _this.parent().find('.bullet');
        var bulletItems = bullet.children();
        cloneFirstAndLast();
        var items = _this.children();
        var count = items.size();
        var itemWidth = _this.parent().width();
        setCarouslAndItemWidth();
        var isAnimate = false;
        var current = 0 ;
        var clock;

        bind();
        autoPlay();

        function setCarouslAndItemWidth(){
            _this.css({
                width:count * itemWidth,
                left:-itemWidth
            });
            items.css({
                width:itemWidth
            });
        }
        function cloneFirstAndLast(){
            var itemsTemp = _this.children();
            _this.append(itemsTemp.first().clone());
            _this.prepend(itemsTemp.last().clone());
        }
        function play(index){
            if (isAnimate) return ;
            isAnimate = true;
            _this.animate({left:-itemWidth*index},500,function(){
                if (index == 0) {
                    _this.css('left',-itemWidth*(count-1));
                    index = count-1;
                } else if (index == count-1) {
                    _this.css('left',-itemWidth);
                    index = 1 ;
                }
                setBullet(index-1);
                current = index;
                isAnimate = false;
            })
        }
        function playNext() {
            play(parseInt((current+1)%count));
        }
        function playPre() {
            play(parseInt((current-1+count)%count));
        }
        function autoPlay(){
            clock = setInterval(function(){
                playNext();
            },2000)
        }
        function stopPlay(){
            clock && clearInterval(clock);
        }
        function setBullet(index){
            bulletItems.removeClass('active').eq(index).addClass('active');
        }
        function bind(){
            bullet.on('click','li',function(e){
                stopPlay();
                var index = $(this).index();
                play(index+1);

                setTimeout(function(){
                    autoPlay();
                },1000);
            })
        }

    });

};
