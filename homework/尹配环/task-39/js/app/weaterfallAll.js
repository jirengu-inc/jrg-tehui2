/**
 * Created by Administrator on 2016/5/27.
 */

define(['jquery','app/Weaterfall'],function($,Weaterfall){

    var weaterfallAll = function(){

        var $ct = $('#protfolio ul');
        var $loadMore = $('#protfolio .btn');
        var listArr = [];
        var num = 8,curPage = 1;

        load();
        
        $loadMore.on('click',function(e){
            console.log("111");
            e.preventDefault();
            load();

        });
        
        
        function load(){
            $loadMore.data('isDone',false);
            $.ajax({
                url:"http://platform.sina.com.cn/slide/album_tech",
                type:"get",
                dataType:"jsonp",
                jsonp:"jsoncallback",
                data:{
                    app_key:"1271687855",
                    num :num,
                    page:curPage++
                },
                success:function (ret) {
                    if (ret.status.code == 0){
                        waitImgAndWeaterfall(randerDom(ret.data));//创建dom，并添加，返回创建的dom的 jq对像
                    } else {
                        $loadMore.data("isDone",true);  //设置本次事件为结束状态
                    }
                },
                error:function(ret){
                    $loadMore.data("isDone",true);  	//设置本次事件为结束状态
                }
            });
        }
        function randerDom(dataArr) {
            var temp = "";

            for(var i=0; i<dataArr.length; i++){
                temp += '<li class="item">';
                temp +=     '<a href=' + dataArr[i].cmnt_url + '>';
                temp +=         '<img src='+ dataArr[i].img_url +' alt="">';
                temp +=     '</a>';
                temp +=     '<h4>' + dataArr[i].short_name + '</h4>';
                temp +=     '<hr>';
                temp +=     '<p>' + dataArr[i].short_intro+ '</p>';
                temp += '</li>';
            }
            var $nodes = $(temp);
            $nodes.css('opacity',0);
            $ct.append($nodes);
            return $nodes;
        }

        function waitImgAndWeaterfall($nodes){
            var defereds = [];
            $nodes.find("img").each(function (idx, el) {
                var defer = $.Deferred();               		//创建延迟对象，
                $(this).on("load",function (e) {
                    defer.resolve();                     		//当图片加载完成，改变延迟对象状态为，已解决
                });
                defereds.push(defer);
            });
            $.when.apply(null,defereds).done(function () {  	//当所有延迟对象都解决，执行函数。
                new Weaterfall($nodes,listArr);        			//瀑布流布局
                $ct.height(Math.max.apply(null,listArr));   	//父元素设置高度
                $loadMore.data("isDone",true);                 	//设置本次事件为结束状态，true：表示可以触发下次事件了
                console.log("执行完毕");
            });
        }

    };

return weaterfallAll;

});