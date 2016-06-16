/**
 * Created by Administrator on 2016/6/12.
 */


var MyPlayer = function(){
    MyPlayer.$musicMa = $('.musicMain');
    MyPlayer.$songTit = $('.songTitle');
    MyPlayer.$songArt = $('.songArtist');
    MyPlayer.player   = $('#Js_player').get(0); //h5播放器
    MyPlayer.$curTime = $('.currentTime');      //当前播放时间
    MyPlayer.$allTime = $('.times');            //歌曲总时间
    MyPlayer.curClock;                          //播放    计时器
    MyPlayer.lyClock;                           //歌词渲染 计时器
    MyPlayer.$playBtn  = $('.playIcon');        //播放暂停按钮
    MyPlayer.$nextBtn  = $('.forwardIcon');     //下一曲
    MyPlayer.$chansCt  = $('.channelsCt');      //频道列表 ul
    MyPlayer.channelId ;
    MyPlayer.$musicIcon= $('.musicIcon');       //频道列表 按钮
    MyPlayer.$chansList= $('.channelsList');    //频道列表页面
    MyPlayer.$volumeBtn= $('.volumeBtn');       //音量按钮
    MyPlayer.$lyrcisBtn= $('.lyrcisBtn');       //歌词开关 按钮
    MyPlayer.$musicLyrics=$('.musicLyrics');    //歌词

    //音量条
    MyPlayer.$vol_wrap = $('.vol-wrap');        //音量条 包裹层
    MyPlayer.$vol      = $('.vol');             //总条
    MyPlayer.$vol_range= $('.vol-range');       //当前音量

    //进度条
    MyPlayer.$progress = $('.progress');        //总进度条
    MyPlayer.$curPro   = $('.progress-range');  //当前进度条
    

    MyPlayer.$iconFloat = $('.iconFloat');       //图标




    MyPlayer.getChannelsInfo();


    MyPlayer.bindEvns();
};
//绑定事件
MyPlayer.bindEvns = function () {
    MyPlayer.$playBtn.on('click',function(){
        event.stopImmediatePropagation();
        playPause()
    });                     //播放 暂停
    MyPlayer.$nextBtn.on('click',function () {
        event.stopImmediatePropagation();
        MyPlayer.getSongInfo(MyPlayer.channelId);

        if (MyPlayer.$playBtn.attr('data-status') == 'pause'){           //暂停状态
            MyPlayer.$playBtn.children().removeClass('active').last().addClass('active');
            // MyPlayer.player.play();
            MyPlayer.$playBtn.attr('data-status','play');
        }

    });                   //下一曲
    MyPlayer.$chansCt.on('click','li',function () {
        var $item = $(this),
            idx = $item.index();

        $item.parent().children().removeClass('active').eq(idx).addClass('active');

        MyPlayer.channelId = parseInt($item.attr('data-channelId'));  //获取该li 对应的 channelsId

        MyPlayer.getSongInfo(MyPlayer.channelId);                     //获取该频道下 随机歌曲
        MyPlayer.$chansList.css('visibility','hidden');
    });              //选频道
    MyPlayer.$musicIcon.on('click',function () {
        MyPlayer.$chansList.css('visibility','visible');
    });                 //打开频道列表
    MyPlayer.$volumeBtn.on('click',function(){                         //打开音量控制器
        event.stopImmediatePropagation();
        if (MyPlayer.$vol_wrap.css('display') == 'none') {
            MyPlayer.$vol_wrap.css('display','inline-block');
        } else {
            MyPlayer.$vol_wrap.css('display','none');
        }
    });                   //打开音量控制条
    MyPlayer.$lyrcisBtn.on('click',function () {                        //歌词开关
        event.stopImmediatePropagation();
        if(MyPlayer.$musicLyrics.hasClass('active')){
            MyPlayer.$musicLyrics.removeClass('active');
            MyPlayer.$lyrcisBtn.children().removeClass('active').last().addClass('active');
        } else {
            MyPlayer.$musicLyrics.addClass('active');
            MyPlayer.$lyrcisBtn.children().removeClass('active').first().addClass('active');
        }
    });                 //打开歌词
    //播放 进度条
    
    MyPlayer.$progress.on('mousedown',function (e) {
        var $progress = $(this);

        MyPlayer.player.pause();     //暂停播放
        setCurrTimeAndWidth(e.offsetX);

        $progress.addClass('pOnMove');

    }).on('mouseup',function (e) {

        var $progress = $(this);
        
        MyPlayer.player.play();     //播放


    });

    //音量控制条
    MyPlayer.$vol.on('mousedown',function (e) {
        event.stopImmediatePropagation();
        var $progress = $(this);

        setVolAndWidth(e.offsetX);

        $progress.addClass('vOnMove');

    });



    $('body').on('mousemove',function (e) {
        var $pOnMove = $('.pOnMove');
        if ($pOnMove.length) {
            setCurrTimeAndWidth(e.offsetX);
        }
        var $vOnMove = $('.vOnMove');
        if ($vOnMove.length) {
            setVolAndWidth(e.offsetX);

        }

    }).on('mouseup',function (e) {

        MyPlayer.$vol.removeClass('vOnMove');
        MyPlayer.$progress.removeClass('pOnMove');
    });

    var setCurrTimeAndWidth = function(evtX){
        var pos = ((evtX/MyPlayer.$progress.width())*100*100)/100; //鼠标点击位置 相对总宽度的百分比
        if ( pos>=100 || pos < 0 ) return ;
        MyPlayer.$curPro.css('width',pos + '%');
        MyPlayer.player.currentTime = (pos/100)*MyPlayer.songLen;

    };
    var setVolAndWidth = function(evtX){
        var pos = ((evtX/MyPlayer.$vol.width())*100*100)/100; //鼠标点击位置 相对总宽度的百分比
        if ( pos>=100 || pos < 0 ) return ;
        MyPlayer.$vol_range.css('width',pos + '%');
        MyPlayer.player.volume = pos/100;
    };
    var playPause = function () {
        if (MyPlayer.$playBtn.attr('data-status') == 'pause'){           //暂停状态
            MyPlayer.$playBtn.children().removeClass('active').last().addClass('active');
            MyPlayer.player.play();
            MyPlayer.$playBtn.attr('data-status','play');
        } else {                                                        //播放状态
            MyPlayer.$playBtn.children().removeClass('active').first().addClass('active');
            MyPlayer.player.pause();
            MyPlayer.$playBtn.attr('data-status','pause');
        }
    }





};
//渲染歌词
MyPlayer.randerLyric = function (lyJson) {
    // console.log(lyJson);
    var firstLy = "";
    MyPlayer.$musicLyrics.children().first().text("");
    MyPlayer.$musicLyrics.find('.lyric.active').text("");

    MyPlayer.lyClock && clearInterval(MyPlayer.lyClock);           //停止上一曲的歌词渲染

    MyPlayer.lyClock = setInterval(function(){
        var temp = lyJson[parseInt(MyPlayer.player.currentTime)];
        if (temp && temp != firstLy ) {
            MyPlayer.$musicLyrics.children().first().text(firstLy);  //设置上一句歌词
            firstLy = temp ;
            MyPlayer.$musicLyrics.find('.lyric.active').text(temp);     //设置当前歌词
        }

    },300);

};
//渲染进度条
MyPlayer.randerProgress = function(songLen){
    MyPlayer.curClock && clearInterval(MyPlayer.curClock);        //停止上一首的计时
    MyPlayer.$allTime.text(MyPlayer.formatTime(songLen));
    MyPlayer.curClock = setInterval(function(){
        MyPlayer.$curTime.text(MyPlayer.formatTime(MyPlayer.player.currentTime));
        MyPlayer.setProgress(MyPlayer.player.currentTime);     //设置进度条；
        if (Math.floor(MyPlayer.player.currentTime) === songLen || Math.ceil(MyPlayer.player.currentTime) === songLen){
            MyPlayer.getSongInfo(MyPlayer.channelId); //自动下一首
        }
    },1000);
};

//获取歌词信息
MyPlayer.getLyricInfo = function (sid, ssid) {
    $.post('http://api.jirengu.com/fm/getLyric.php',{ssid: ssid, sid:sid})
        .done(function(lyricStr){
            lyricInfo = JSON.parse(lyricStr);
            var reg4Lyr = new RegExp(/\[\d+\:\d+\.\d+\]/,"g");    //匹配[00:00.00]
            var reg4time = new RegExp(/\d+\:\d+\.\d+/,"g");        //匹配 00:00.00
            var lyJson = {};                                    //歌词json
            var myArray;
            var lyricArr = [];
            //分割歌词

            if (lyricInfo.lyric) {
                lyricArr = lyricInfo.lyric.split("\r\n");
                for (var i=0;i<lyricArr.length;i++){
                    lyric = lyricArr[i].replace(reg4Lyr,"");          //去掉所有时间，只留歌词文本
                    while ((myArray = reg4time.exec(lyricArr[i])) !== null) {  //一句歌词 可能有多个时间，匹配出所有时间

                        var t = myArray[0].split(':');

                         lyJson[t[0]*60+parseInt(t[1])] = lyric ;
                    }
                }
                //渲染歌词
                MyPlayer.randerLyric(lyJson);
            }

        });
};
//获取随机歌曲信息  设置播放器
MyPlayer.getSongInfo = function (channel_id) {

    $.get('http://api.jirengu.com/fm/getSong.php',{channel: channel_id})
        .done(function(song){
            song = JSON.parse(song);
            if (song.r != 0) {
                console.log("获取歌曲失败");
                return;
            }

            var songInfo = song.song[0],            //歌曲总信息
                songUrl  = songInfo.url,            //歌曲地址
                songPic  = songInfo.picture,        //歌曲图片
                songTit  = songInfo.title,          //歌曲名
                songArt  = songInfo.artist,         //演唱者
                songSid  = songInfo.sid,            //sid
                songSsid = songInfo.ssid;           //ssid
                songLen  = songInfo.length;         //长度
            MyPlayer.songLen = songLen;


            //将信息填入页面
            MyPlayer.$songTit.text(songTit);        //歌名
            MyPlayer.$songArt.text(songArt);        //歌手
            MyPlayer.$musicMa.css('backgroundImage','url('+songPic+')');    //图片
            MyPlayer.player.src = songUrl;          //设置 音乐 播放器

            if (songLen != NaN) {
                console.log('歌曲长度：' + songLen);
                MyPlayer.randerProgress(songLen);
            }

            //获取歌词信息
            MyPlayer.getLyricInfo(songSid,songSsid);
        });

};
//点击进度条 设置 进度


//设置进度条
MyPlayer.setProgress = function (currTime) {
    currTime = Math.round(currTime*100)/100;
    var pos = Math.round((currTime/MyPlayer.songLen)*100*100)/100;  //当前时间相对总时间的百分比
    MyPlayer.$curPro.css('width',pos + '%');

};

//获取频道信息
MyPlayer.getChannelsInfo = function () {
    $.get('http://api.jirengu.com/fm/getChannels.php')
        .done(function(channelsInfo){
            //将频道信息渲染至页面
            var info = JSON.parse(channelsInfo),
                temp = "";

            for (var i=0;i<info.channels.length;i++){
                // <li class="channelsItem"><a data-channelId=1 href="#">{{channelName}}</a></li>
                temp += '<li class="channelsItem musicbtn" data-channelId=' + info.channels[i].channel_id + '>' + info.channels[i].name;
                temp += '</li>';
            }
            MyPlayer.$chansCt.append($(temp));

            var randomNum = Math.random() * (info.channels.length - 1) + 1;

            MyPlayer.channelId = Math.floor(randomNum);
            MyPlayer.$chansCt.children().eq(MyPlayer.channelId).addClass('active');

            MyPlayer.getSongInfo(MyPlayer.channelId);           //获取随机频道 随机音乐
        });
};
MyPlayer.formatTime = function formatTime(time){
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
    // return (zero(h)+":"+zero(i)+":"+zero(s));
    return (zero(i)+":"+zero(s));
};

MyPlayer.prototype = {};



/*


*/








