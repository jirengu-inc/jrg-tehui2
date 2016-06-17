/**
 * Created by Administrator on 2016/6/10.
 */
;(function($){

    var CarouselCSS3 = function (poster) {
        var _this_ = this;
        //保存单个旋转木马特效对象
        this.poster = poster;
        this.posterList = this.poster.find('ul.poster-list');
        this.prevBtn = this.poster.find('div.poster-prev-btn');
        this.nextBtn = this.poster.find('div.poster-next-btn');
        this.items = this.posterList.children();
        this.itemsCount = this.items.size();
        //如果是偶数张图
        if (this.itemsCount % 2 == 0) {
            this.posterList.append(this.items.first().clone()); //第一张复制一份放到末尾
            this.items = this.posterList.children();
            this.itemsCount = this.items.size();
        }
        this.firstItem = this.items.first();
        this.lastItem = this.items.last();

        this.isAnimate = false;
        //默认配置参数
        this.setting = {
            "width":1000,           //幻灯片宽度
            "height":270,           //幻灯片高度
            "posterWidth":640,      //幻灯片第一帧高度
            "posterHeight":270,     //幻灯片第一帧高度
            "scale":0.9,            //缩放比例
            "speed":500,            //播放速度
            "autoPlay":false,       //是否自动轮播
            "delay":5000,           //轮播速度
            "verticalAlign":"middle"//对齐方式
        };

        //合并配置
        $.extend(this.setting,this.getSetting());

        this.setSetting();
        this.setPosterPos();
        //设置按钮事件
        this.prevBtn.on('click',function () {
            _this_.carouselRotate('right');
        });
        this.nextBtn.on('click',function () {
            _this_.carouselRotate('left');
        });
        //是否自动播放
        if (this.setting.autoPlay) {
            this.autoPlay();
            this.poster.hover(function(){
                _this_.clock && clearInterval(_this_.clock);
            },function(){
                _this_.autoPlay();
            });
        }
    };
    CarouselCSS3.prototype = {
        //自动播放
        autoPlay:function(){
            var _this_ = this;
            this.clock = setInterval(function(){
                _this_.carouselRotate('left');
            },this.setting.delay);
        },
        //旋转
        carouselRotate:function(dir){
            var _this_ = this;
            var zIndexArr = [];

            if (this.isAnimate) return ;
            this.isAnimate = true;

            if (dir === "left") {
                this.items.each(function(){
                    var prev = $(this).prev().get(0)?$(this).prev():_this_.lastItem,
                        preWidth = prev.width(),
                        preHeight = prev.height(),
                        preZindex = prev.css('zIndex'),
                        preLeft   = prev.css('left'),
                        preTop    = prev.css('top'),
                        preOpac   = prev.css('opacity');

                    zIndexArr.push(preZindex);
                    $(this).animate({
                        width:preWidth,
                        height:preHeight,
                        left:preLeft,
                        top:preTop,
                        opacity:preOpac
                    },_this_.setting.speed,function(){
                        _this_.isAnimate = false;
                    })
                });
                _this_.items.each(function(i){
                    $(this).css('zIndex',zIndexArr[i]);
                })


            }else if (dir === 'right') {
                this.items.each(function(){
                    var next = $(this).next().get(0)?$(this).next():_this_.firstItem,
                        nextWidth = next.width(),
                        nextHeight = next.height(),
                        nextZindex = next.css('zIndex'),
                        nextLeft   = next.css('left'),
                        nextTop    = next.css('top'),
                        nextOpac   = next.css('opacity');

                    zIndexArr.push(nextZindex);
                    $(this).animate({
                        width:nextWidth,
                        height:nextHeight,
                        left:nextLeft,
                        top:nextTop,
                        opacity:nextOpac
                    },_this_.setting.speed,function(){
                        _this_.isAnimate = false;
                    })
                });
                _this_.items.each(function(i){
                    $(this).css('zIndex',zIndexArr[i]);
                })

            }
        },
        //设置垂直对齐
        setVerticalAlign:function(height){
            switch (this.setting.verticalAlign){
                case 'top':
                    return 0;
                    break;
                case 'bottom':
                    return this.setting.height - height;
                    break;
                case 'middle':
                    return (this.setting.height - height)/2;
                    break;
                default:
                    return (this.setting.height - height)/2;
            }
        },
        //设置其他帧位置关系
        setPosterPos:function(){
            var sliceItems = $(this.items).slice(1),
                sliceSize = Math.ceil(sliceItems.size()/2),
                rightSlice = sliceItems.slice(0,sliceSize), //右边帧
                leftSlice = sliceItems.slice(sliceSize),    //左边帧
                scale = this.setting.scale,                 //缩放比例
                sideWidth = (this.setting.width-this.setting.posterWidth)/2, //单边宽度
                firstWidth = this.setting.posterWidth,      //第一帧宽度
                firstHeight = this.setting.posterHeight;    //第一帧高度

            console.log(leftSlice.size());
            var _this_ = this;
            //设置右边帧的位置关系
            var rw = firstWidth,      //参考 第一帧的宽度
                rh = firstHeight,     //参考 第一帧的高度
                rLevel = Math.floor(this.itemsCount/2),      //层级
                gap = sideWidth/sliceSize,//每帧偏移的宽度
                width = rw + sideWidth;

            rightSlice.each(function (i) {
                var j = i;
                rw = rw * scale;
                rh = rh * scale;

                $(this).css({
                    zIndex:--rLevel,
                    width:rw,
                    height:rh,
                    opacity:1/(++j),
                    left:width + (++i)*gap - rw,
                    top:_this_.setVerticalAlign(rh)
                });
            });
            //设置左边帧的位置关系
            var lw = rightSlice.last().width(),              //参照 右边最后一个的宽度
                lh = rightSlice.last().height(),             //参照 右边最后一个的高度
                rLevel = Math.floor(this.itemsCount/2);      //层级

            leftSlice.each(function (i) {

                $(this).css({
                    zIndex:i,
                    width:lw,
                    height:lh,
                    opacity:1/rLevel--,
                    left:i*gap,
                    top:_this_.setVerticalAlign(lh)
                });
                lw = lw / scale;        //比例自增
                lh = lh / scale;
            });

        },
        //设置配置
        setSetting : function(){
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterList.css({
                width:this.setting.width,
                height:this.setting.height
            });
            //计算左右按钮的宽度
            var w = (this.setting.width-this.setting.posterWidth)/2;
            this.prevBtn.css({
                width: w,
                height:this.setting.height,
                zIndex:Math.ceil(this.itemsCount/2)
            });
            this.nextBtn.css({
                width: w,
                height:this.setting.height,
                zIndex:Math.ceil(this.itemsCount/2)     //向上取整
            });
            //设置第一帧的位置/宽高
            this.firstItem.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                left:w,
                zIndex:Math.floor(this.itemsCount/2)    //向下取整
            });


        },
        
        //获取自定义配置
        getSetting : function(){
            var setting = this.poster.attr('data-setting');
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    CarouselCSS3.init = function(posters){
        var _this_ = this;
        posters.each(function () {
            new _this_($(this));
        })
    };
    window['CarouselCSS3'] = CarouselCSS3;
})(jQuery);