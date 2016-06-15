/**
 * Created by Administrator on 2016/6/9.
 */
(function($){
    /**
     * 拖拽
     * @param curTarget
     */
    $.fn.drag=function (curTarget,callback) {
        curTarget = $(curTarget)
        var params = {
            target:curTarget,
            left:0,
            top:0,
            currentX: 0,
            currentY: 0,
            flag: false,
            init:function () {
                //初始位置
                params.left = curTarget.offset().left;
                params.top = curTarget.offset().top;
                return this;
            },
            bindEvent:function () {
                // 鼠标按钮被按下
                curTarget.on('mousedown', function(event){
                    params.flag = true;
                    //防止IE文字选中       event = window.event;
                    // bar.onselectstart = function(){
                    //     return false;
                    // }
                    //初始位置  鼠标按下的店至页面的距离
                    params.currentX  = event.clientX;
                    params.currentY  = event.clientY;

                });

                //鼠标按键被松开
                $(document).on('mouseup', function(e){
                    params.flag = false;
                    //移动后边框距至页面的距离,更新位置信息
                    params.left = curTarget.offset().left;
                    params.top = curTarget.offset().top;
                    //console.log('mouseup',params.left,params.top)
                });
                //鼠标被移动
                $(document).on('mousemove', function(e){
                    //var e = event ? event: window.event;
                    if(params.flag){
                        //console.log('mousemove', e.pageX,e.pageY,params.left,params.top)
                        //鼠标一定后的坐标点  -  鼠标按下的坐标点 =位移
                        var disX = e.pageX - params.currentX,
                            disY = e.pageY - params.currentY;

                        curTarget.css({
                            left:params.left + disX + "px",
                            top:params.top + disY + "px"
                        });
                    }
                    callback && typeof callback === "function" && callback.call(disX,disY);

                });
                return  this
            }
        };
        params.init().bindEvent();
        return params;
    }

    /**
     *  滑块实现
     * @param options={
            maxValue:1,//最大值
            defaultValue:1,//默认值
            direction:'x',//方向   x y all   没实现
            unit:0.1,//单位步长对应的实际值
            moveCallback:function (pos,utils) {
                $('.slider-range').width(pos*100+'%')
                $('.rightTip').css('display','block');
                $('.rightTip').text(pos)
                player.setVolume(pos);
            },//鼠标移动中
            lastCallBack:function (value,utils) {
                $('.slider .rightTip').css('display','none');
            }//鼠标松开是调用
        }
     * @returns {*}
     */
    $.fn.slider=function (options) {
        //$.extend(defaultOptions, options);//copy至defaultOptions
        var utils;
        this.each(function() {
            var handleBtn = $(this);
            utils={
                currentX: 0,//当前坐标
                currentY: 0,//当前坐标
                currentValue:null,//移动步长个数
                scalePerStep: 20,  //单位步长对应像素
                stepSize:10,//步长的总个数
                clickedOnCursor: false,//标识
                width:0,//滑块所在容器宽度
                //setVal:null ,//根据实际值计算移动像素时的回调函数，为窗口resize
                init:function () {
                    this.width=handleBtn.parent().width();
                    this.stepSize = options.maxValue / options.unit;//最大值中包含步长的总个数
                    this.scalePerStep = utils.width / this.stepSize;
                    this.currentX = $(handleBtn).offset().left+ ($(handleBtn).width())*0.5;//transform: translate(-50%,0);
                    this.currentY = $(handleBtn).offset().top;
                    this.setValue((!!utils.currentValue ? utils.currentValue : options.defaultValue)/options.unit)
                    return this;
                },
                layout:function () {
                    this.width=handleBtn.parent().width();
                    this.scalePerStep = utils.width / this.stepSize;
                    //utils.setVal(utils.currentValue*utils.scalePerStep, utils.setView)
                },
                bindEvent:function () {
                    $(window).on('resize',function (e) {
                        utils.layout();
                    });

                    handleBtn.parent().on('click',function (e) {
                        var curPostion = $(handleBtn).offset().left+ ($(handleBtn).width())*0.5;
                        var posX =e.pageX - curPostion-utils.currentX;
                        var stepCunt = (curPostion+posX)/utils.scalePerStep;
                        utils.setValue(stepCunt);
                    });

                    $(document).mouseup(function() {//鼠标按键被松开
                        if (utils.clickedOnCursor) {
                            options.lastCallBack && options.lastCallBack.call(this, utils.currentValue * options.unit,utils);
                            utils.clickedOnCursor=false
                        }
                    }).mousemove(function(e) {//鼠标被移动
                        e.preventDefault();
                        e.stopPropagation();
                        utils.handle(e);
                    });
                    handleBtn.mousedown(function(e) {// 鼠标按钮被按下
                        e.preventDefault();
                        utils.clickedOnCursor = true;
                    });
                    handleBtn.click(function (e) {
                        e.stopImmediatePropagation();
                    });
                    return this;
                },
                handle: function(e) {
                    if (utils.clickedOnCursor) {
                        if(e.pageX < this.currentX){
                            return ;
                        }
                        var pos = [];
                        pos[0] = e.pageX - this.currentX;
                        //在宽度为options.width包含stepSize个步长，移动pos[0]相当于几个步长
                        var curStep = pos[0] * this.stepSize / utils.width //Math.floor();
                        //拖动超出范围，取最大步长数
                        this.currentValue = (curStep >= this.stepSize ? this.stepSize: curStep);
                        this.setValue(this.currentValue);
                    }
                },
                /**
                 * 根据步长算移动像素
                 * @param currentValue  共多少个步长
                 */
                setValue: function(currentValue) {
                    options.moveCallback && options.moveCallback.call(this, currentValue * options.unit,utils);
                    $(handleBtn).css({
                        'left':  (currentValue * utils.scalePerStep)  + 'px'
                    });
                    utils.isCalled = false;
                },

                /**
                 * 根据实际值计算移动像素
                 * @param currentValue N个步长的距离
                 */
                setVal: function(currentValue,setView) {
                    var lefPos = currentValue* this.width/options.maxValue ;
                    //var l2 = (currentValue/options.unit)*this.scalePerStep;// utils.width / this.stepSize
                    $(handleBtn).css({
                        'left':  lefPos + 'px'
                    });
                    utils.setView =setView;
                    utils.setView && utils.setView.call(utils,lefPos);

                }
            }
            utils.init().bindEvent();
        });
        return utils;
    }

})(jQuery)