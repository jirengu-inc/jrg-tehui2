$.fn.carousel = function(){
    this.each(function(){
        var _this = $(this),
            $pre = _this.find('.pre'),
            $next = _this.find('.next'),
            $items = _this.find('.img-ct li'),
            $bullet = _this.find('.bullet'),
            imgCount = $items.length;
        var nowIdx = 0;
        var isAnimate = false;

        $next.on('click', function(){
            playNext();
        });

        $pre.on('click', function(){
            playPre();
        });

        $bullet.find('li').on('click', function(){
            var idx = $(this).index();
            play(idx);
        });

        function playNext(){
            play( (nowIdx+1)%imgCount );
        }
        function playPre(){
            play( (imgCount+nowIdx-1)%imgCount );
        }
        function play(idx){
            if(isAnimate) return;
            isAnimate = true;
            $items.eq(nowIdx).fadeOut(600);
            $items.eq(idx).fadeIn(600, function(){
                isAnimate = false;
            });
            nowIdx = idx;
            setBullet();
        }
        function setBullet(){
            $bullet.children().removeClass('active').eq(nowIdx).addClass('active');
        }
        function autoPlay(){
            setInterval(function(){
                playNext();
            }, 2000);
        }
        play(0);
        autoPlay();
    })
};
