/**
 * Created by Administrator on 2016/6/9.
 */
var player = (function(){

    function Player() {}

    /**
     *
     * @param opts{
     * media  媒体播放元素
     * loop  循环播放
     * }
     */
    Player.prototype.init = function(opts){
        this.media = opts.media;
        this.loop=opts.media;
        this.bindEvent(this.media);
        this.lyricURL = opts.lyricURL;
        this.lyricCT = opts.lyricCT;
        this.progressBar=opts.progressBar;
        this.volumeBar=opts.volumeBar;
        this.initLyric(opts.lyricURL,function (lyc) {
            this.lyricContent=lyc;
        })
        return this;
    }

    Player.prototype.initLyric =  function (url,callBack) {
        var self =this;
        $.ajax({
            url:url,
            headers:{
                contentType:"application/x-www-form-urlencoded;charset=UTF-8"//乱码
            },
            success:function(lrc){
                callBack &&  callBack.call(self, parseLyric(lrc));
            },
            error:function(e){
                if(error)error(e);
            }
        });
    }
    Player.prototype.bindEvent=function(media) {
        var self = this;
        $('.play').on('click',function (e) {
            self.media.play();
        });

        $('.pause').on('click',function (e) {
            self.media.pause();
        });

        $(self.media).on('timeupdate',function () {
            //音乐当前位置
            var curr = Math.floor(media.currentTime);
            //音乐长度
            var dur = Math.floor(media.duration);
            $(".duration").text(formatTime(dur));
            $(".currentTime").text(formatTime(curr));
            //进度条位置
            self.utils.setVal(curr,function (pos) {
                $('.progress-range').width(pos)
            });

            rollLyric(self,curr);

        });
        //成功获取资源长度, init
        $(self.media).on('loadedmetadata',function () {
            //页面滑块初始化--播放进度条
            self.utils =self.progressBar.slider({
                maxValue:self.media.duration,//最大值
                defaultValue:0,//默认值
                direction:'x',//方向   x y all  TODO
                unit:1,
                moveCallback:function (step,utils) {
                    $('.progress-range').width(step*utils.scalePerStep)
                    $('.progress .rightTip').css('display','block');
                    $('.progress .rightTip').text(step)
                    self.media.currentTime=step;
                },
                lastCallBack:function (value,target) {
                    $('.progress .rightTip').css('display','none');
                }
            });

            //音量滑块
            self.volumeBar.slider({
                maxValue:1,//最大值
                defaultValue:1,//默认值
                direction:'x',//方向   x y all
                unit:0.1,//单位步长
                moveCallback:function (pos,utils) {
                    $('.slider-range').width(pos*100+'%')
                    $('.slider .rightTip').css('display','block');
                    $('.slider .rightTip').text(pos)
                    player.setVolume(pos);
                },
                lastCallBack:function (value,utils) {
                    $('.slider .rightTip').css('display','none');
                }
            });
            //初始化歌词
            if(self.lyricURL){
                renderLRC(self.lyricCT , self.lyricContent);
            }
        });

        //播放结束
        $(self.media).on('ended',function () {
            console.log('ended',this.loop);
        });
        //play事件会让暂停后的play方法从头播放
//            $(self.media).on('play',function () {
//            });
    }
    //
    Player.prototype.setURL=function (url) {
        $(this.media).attr('src',url);
        return  this;
    }

    Player.prototype.setVolume=function (volume) {
        this.media.volume=  1> volume >0 ?  volume :1;
    }


    Player.prototype.setModel=function (model) {
        this.media.loop=this.loop;
        return this;
    }

    Player.prototype.getMedia=function () {
        return this.media;
    }




    function renderLRC($ele,lrc){
        $ele.empty();
        var lis=""; //TODO  lis 没有被初始化，所以第一次循环会得到undefined
        for( var line in lrc ){
            lis+= '<li>'+lrc[line].text+'</li>';
        }
        $ele.append(lis);
    }

    function  rollLyric(self,cur) {
        var lyric =self.lyricContent;
        var ct4Lyric =  self.lyricCT;
        var content = lyric[cur];
        var liH = ct4Lyric.find('li').eq(1).outerHeight();
        var top = ct4Lyric.height()/4;
        if(content){
            ct4Lyric.find('li').eq(content.lineNum).addClass('active').siblings().removeClass('active');
            ct4Lyric.css({'top':(top  - content.lineNum*liH)+'px'});
        }
    }

    //音乐计时格式
    function formatTime(time){
        var h=0,i=0,s=parseInt(time);
        if(s>60){
            i=parseInt(s/60);
            s=parseInt(s%60);
            if(i > 60) {
                h=parseInt(i/60);
                i = parseInt(i%60);
            }
        }
        var zero=function(v){
            return (v>>0)<10?"0"+v:v;
        };
        return (zero(h)+":"+zero(i)+":"+zero(s));
    }

    /**
     * @param lrc 歌词
     * @returns {0: "你的每一次呼吸 - 水木年华", 4: "(电影《怒放》插曲)"......}
     */
    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        var x=0;
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /^\[.*?\]/g;///\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            var clause = lyric.replace(timeReg,'');
            if(!timeRegExpArr ||  !clause)continue;
            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                clause && (lrcObj[time] = {text:clause,lineNum:x++});
            }
        }
        return lrcObj;
    }

    var instance;

    if (!instance) {
        instance = new Player();
    }
    return instance;
}());
