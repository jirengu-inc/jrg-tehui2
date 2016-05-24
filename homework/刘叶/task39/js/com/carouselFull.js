/**
 * Created by Yakumo on 16/5/19.
 */
//Tips:
//     0.使用方法为 CarouselFull.init($ct,'title','intro');$ct为容器，默认为body；
//     1.title是轮播中间的介绍文字，intro是轮播中间的介绍文字，默认为空，可以设置；
//     2.图片加载使用懒加载，使用时请注意修改data-bg-img里图片地址；
//     3.本方法是利用的Clone头尾的方法，实现了首页全屏轮播，resize时可以调整自身大小充满第一屏；
define(['jquery'],function($){
    var CarouselFull = {
        init:function(content,title,intro){
            this.content = content||'body';
            this.title = title||'';
            this.intro = intro||'';
            this.curIdx = 0;
            this.isAnimate = false;
            this.render();
            this.clone();
            this.bind();
            this.start();
            this.resize();
        },
        render:function(){
            var htmls = '',
                $Carousel;
            htmls += '<div id="header">';
            htmls += '  <div class="carousel">';
            htmls += '    <ul class="img-ct clearfix">';
            htmls += '      <li class="item">';
            htmls += '        <div class="cover" data-bg-img="img/carouselFull/kyudo.jpg"></div>';
            htmls += '        <div class="main">';
            htmls += '          <h2>'+ this.title +'</h2>';
            htmls += '          <p>'+ this.intro +'</p>';
            htmls += '        </div>';
            htmls += '      </li>';
            htmls += '      <li class="item">';
            htmls += '        <div class="cover" data-bg-img="img/carouselFull/ryouri.jpg"></div>';
            htmls += '        <div class="main">';
            htmls += '          <h2>'+ this.title +'</h2>';
            htmls += '          <p>'+ this.intro +'</p>';
            htmls += '        </div>';
            htmls += '      </li>';
            htmls += '      <li class="item">';
            htmls += '        <div class="cover" data-bg-img="img/carouselFull/miko.jpg" ></div>';
            htmls += '        <div class="main">';
            htmls += '          <h2>'+ this.title +'</h2>';
            htmls += '          <p>'+ this.intro +'</p>';
            htmls += '        </div>';
            htmls += '      </li>';
            htmls += '      <li class="item">';
            htmls += '        <div class="cover" data-bg-img="img/carouselFull/ramen.jpg" ></div>';
            htmls += '        <div class="main">';
            htmls += '          <h2>'+ this.title +'</h2>';
            htmls += '          <p>'+ this.intro +'</p>';
            htmls += '        </div>';
            htmls += '      </li>';
            htmls += '    </ul>';
            htmls += '    <ul class="bullet">';
            htmls += '      <li class="active"></li>';
            htmls += '      <li></li>';
            htmls += '      <li></li>';
            htmls += '      <li></li>';
            htmls += '    </ul>';
            htmls += '  </div>';
            htmls += '</div>';
            this.$Carousel = $(htmls);
            $(this.content).append(this.$Carousel);
            this.$Carousel.height = $(window).height();
            this.$Carousel.css({
                'height':this.$Carousel.height
            });
            return this.$Carousel;
        },
        clone:function(){
            this.$ct = this.$Carousel.find('.img-ct');
            this.$items = this.$ct.children();
            this.$bullet = this.$Carousel.find('.bullet');
            this.imgWidth = $(window).width();
            this.imgCount = this.$ct.children().length;
            this.imgRealCount = this.imgCount+2;
            this.$ct.prepend(this.$items.last().clone());
            this.$ct.append(this.$items.first().clone());
            this.$ct.find('.item').css('width', this.imgWidth);
            this.$ct.find('.cover').css('width', this.imgWidth);
            this.$ct.css({
                left: 0-this.imgWidth, //让第一个出现的是非clone的
                width: this.imgRealCount * this.imgWidth
            });
        },
        bind:function(){
            var _this = this;
            this.$bullet.find('li').on('click', function(){
                var idx = $(this).index();
                if(idx > _this.curIdx){
                    _this.playNext(idx - _this.curIdx);
                }
                if(idx < _this.curIdx){
                    _this.playPre(_this.curIdx - idx);
                }
            });
        },
        playNext:function(idx){
            var _this = this;
            var idx = idx || 1;
            if(!_this.isAnimate){
                _this.isAnimate = true;
                _this.setBg(_this.curIdx+2);
                _this.$ct.animate({left: '-='+(_this.imgWidth*idx)},function(){
                    _this.curIdx = (_this.curIdx + idx) % _this.imgCount;
                    if(_this.curIdx === 0){
                        _this.$ct.css({left: 0-_this.imgWidth});
                    }
                    _this.isAnimate = false;
                    _this.setBullet();
                });
            }
        },
        playPre:function(idx){
            var _this = this;
            var idx = idx || 1;
            if(!_this.isAnimate){
                _this.isAnimate = true;
                _this.setBg(_this.curIdx);
                _this.$ct.animate({left: '+='+(_this.imgWidth*idx)},function(){
                    _this.curIdx = (_this.imgCount + _this.curIdx - idx)%_this.imgCount;
                    if(_this.curIdx === (_this.imgCount - 1)){
                        _this.$ct.css({left: 0-_this.imgWidth * _this.imgCount});
                    }
                    _this.isAnimate = false;
                    _this.setBullet();
                });
            }
        },
        setBullet:function(){
            var _this = this;
            _this.$bullet.children().removeClass('active').eq(_this.curIdx).addClass('active');
        },
        setBg:function(num){
            var _this = this;
            var idx = num || 1;
            _this.$bgPic = _this.$ct.children().eq(idx);
            _this.$cover = _this.$bgPic.find('.cover');
            _this.imgUrl = _this.$cover.attr('data-bg-img');
            _this.isBgset = false;
            if(_this.isBgset){
                return;
            }
            _this.$cover.css('background-image', 'url('+_this.imgUrl+')');
            _this.isBgset = true;
        },
        autoPlay:function(){
            var _this = this;
            _this.clock = setInterval(function(){
                _this.playNext();
            }, 2500);
        },
        stopAutoPlay:function(){
            var _this = this;
            clearInterval(_this.clock);
        },
        resetVal:function(){
            var _this = this;
            _this.stopAutoPlay();
            _this.imgWidth = $(window).width();
            _this.$ct.find('.item').css('width', _this.imgWidth);
            _this.$ct.find('.cover').css('width', _this.imgWidth);
            _this.$ct.css({
                left: 0-_this.imgWidth*(_this.curIdx+1),
                width: _this.imgRealCount * _this.imgWidth
            });
            _this.$Carousel.height = $(window).height();
            _this.$Carousel.css({
                'height':this.$Carousel.height
            });
            _this.autoPlay();
        },
        resize:function(){
            var _this = this;
            var clock;
            $(window).on('resize',function(){
                if(clock){
                    clearTimeout(clock);
                }
                clock = setTimeout(function(){
                    _this.resetVal();
                },200);
            })
        },
        start:function(){
            var _this = this;
            _this.setBg(1);
            _this.autoPlay();
        }
    };
    return CarouselFull;
});
