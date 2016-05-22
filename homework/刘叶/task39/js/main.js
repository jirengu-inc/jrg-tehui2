/**
 * Created by Yakumo on 16/5/22.
 */
// 初次使用require.js,注释多写点,帮助自己理解
requirejs.config({
    baseUrl:'./js',//这里是引用main.js的页面所在的路径为基础开始跳跃,设定模块们的路径,使得后续模块引入少写一点
    paths:{
        'jquery':'lib/jquery'//jquery我放在别的地方,需要用paths去找他,基准是main.js所在的位置开始跳跃,后缀js不用加
    }
});

//下面是依赖的定义:这里我啰嗦一下,分为两个点:
// Tips:
//   1.第一个参数为数组,里面是依赖的模块,jquery是例外被paths设定了,只需要写键值对的键就可以了,
// 后面的模块就需要根据上面设置的baseUrl来走,只需要写com/xxx就可以了,baseUrl给你把前面的给省了,后缀js不用加
//   2.第二个是function,是回调,意思是前面的模块都加载好了之后,就开始做事,和前面模块顺序对应好,不要弄错了,
// function里面都是参数,这里参数的名字你可以随便叫什么,没必要和模块名称或者模块return出来的对象名称一样;
// 因为就是一个代号,代表着你这个模块加载好了之后return的东西,然后赋值给了这个参数,然后这个参数可以使用模块的API;
// 为了一目了然,我保持了 "模块return出来的对象的名称" 和 "回调中参数的名称" 一致;

require(['jquery','com/goTop','com/carouselFull','com/waterFallLayout','com/exposure','com/jumpTo']
    , function($,GoTop,CarouselFull,waterFall,Exposure,JumpTo){

        //此处添加一个全屏轮播,参数为父容器,默认为body
        CarouselFull.init('#top-content');

        //此处添加一个回到顶部按钮,参数都为可选,分别为speed,right、top
        GoTop.init(500,'3%','80%');

        //此处设定跳转效果,目标容器必须设定,速度可选,单位ms
        new JumpTo($(".nav .nav-list li a"),600);
        new JumpTo($(".nav .logo"),500);

        //此处设定导航栏变色及变色位置
        var navList = $('.nav');
        $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            var winH = $(window).height();
            if(scrollTop > winH*0.3){
                navList.css({backgroundColor:'rgba(0, 0, 0, 0.8)'})
            }else{
                navList.css({backgroundColor:'rgba(0, 0, 0, 0.2)'})
            }
        });

        //此处添加曝光功能,第一个参数是选定的目标D,第二个可选,为曝光位置比例
        $('#about .timeline li').each(function(){
            new Exposure($(this), 3/5);
        });

        //此处添加一个add按钮，用来发送AJAX请求的
        var $ct = $('body');
        var $addMore =$('<a href="#" class="addMore">Add</a>');
        $addMore.appendTo($ct);
        $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop > 100){
                $addMore.css('opacity',1)
            }else{
                $addMore.css('opacity',0)
            }
        });
        //点击发送AJAX请求图片
        isSend = false;//防止重复点击状态锁
        $('.addMore').on('click',function(e){
            e.preventDefault();
            if(isSend) return;
            isSend = true;//上锁
            $.ajax({
                url: './php/getMore.php',
                dataType: 'json',
                type: 'GET',
                data: {
                    len: 8//小于等于9，我只有9个图
                },
                success: function (ret) {
                    onSuccess(ret);
                },
                error: function () {
                    alert('服务器出错了!');
                }
            });
        });
        function onSuccess(ret) {
            //{status: 1, data: ['./img/phpImg/1','./img/phpImg/2,……]}
            var srcArr = ret.data;
            place(srcArr);
        }
        function place(nodeList){
            var $nodes = render(nodeList);
            var defereds = [];
            $nodes.find('img').each(function(){
                var defer = $.Deferred();//设定deferred
                $(this).load(function(){
                    defer.resolve();//每当一个图片加载好,就将状态改变
                });
                defereds.push(defer);//并且push进这个deterred状态数组
            });
            $.when.apply(null,defereds).done(function(){//全部加载完毕之后
                //此处将已经在页面上，并且已经加载好的图片体，进行瀑布流布局，参数都必须输入
                //第一个参数为容器，第二个参数为需要布局的图片体
                waterFall.init($('.portfolio-content'),$('.portfolio-function'));
                $nodes.animate({opacity:'1'},500,function(){
                    $(this).fadeIn(500);
                });
                isSend = false;//解锁
            });
        }
        //将php返回的数据，进行组装，并且放到页面上去
        function render(items){
            var htmls = '',
                $nodes;
            for(var j=0;j<items.length;j++){
                htmls += '<li class="portfolio-function">';
                htmls += '  <div class="portfolio-hover icon-plus"></div>';
                htmls += '  <img src=" '+ items[j]+'.jpg" class="portfolio-pic">';
                htmls += '  <div class="portfolio-function-word">';
                htmls += '    <h3>舰娘手办</h3>';
                htmls += '  <h4>点击也不能购买</h4>';
                htmls += '  </div>';
                htmls += '</li>';
            }
            $nodes = $(htmls);
            $('.portfolio-content').append($nodes);
            $nodes.css({
                opacity:'0'
            });
            return $nodes;
        }
});