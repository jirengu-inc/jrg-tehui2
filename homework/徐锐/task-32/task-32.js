$(function () {

    var waterFall = {};


    waterFall.col = [];
    waterFall.nodeWidth = $('.item').outerWidth(true);
    waterFall.colNum = parseInt($('.ct').width() / waterFall.nodeWidth);

    waterFall.createArr = function () {
        for(var i = 0; i<waterFall.colNum; i++){
            waterFall.col.push(0);
        }
    };

    waterFall.checkShow = function () {
        if(waterFall.isShow($('#target'))){
            waterFall.dealWithData();
        }
    };

    waterFall.listenScroll = function () {
        var clock;
        $(window).on('scroll',function () {
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function () {
                waterFall.checkShow();
            },300);
        });
    };

    waterFall.isShow = function ($el) {
        var scrollH = $(window).scrollTop(),
            winH = $(window).height(),
            elTop = $el.offset().top;
        if(winH + scrollH > elTop){
            return true;
        } else {
            return false;
        }
    };

    waterFall.dealWithData = function () {
        var curPage = 1,
            perPageCount = 10;
        $.ajax({
            url: 'http://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',
            jsonp:"jsoncallback",
            data: {
                app_key: '1271687855',
                num: perPageCount,
                page: curPage
            }
        }).done(function (ret) {
            if(ret && ret.status && ret.status.code === '0'){
                waterFall.place(ret.data);
            } else {
                console.log('err');
            }
        })
    };

    waterFall.place = function (nodeList) {
        // console.log(nodeList);
        var $node = waterFall.renderData(nodeList),
            newList = [];
        $node.find('img').each(function () {
            var defer = $.Deferred();
            $(this).load(function () {
                defer.resolve();
            });
            // console.log(defer);
            newList.push(defer);
        });
        $.when.apply(null,newList).done(function () {
            waterFall.waterFallPlace($node);
        });
    };

    waterFall.waterFallPlace = function ($node) {

        $node.each(function () {

            var $cur = $(this),
                idx = 0,
                min = waterFall.col[0];

            // 找出最短的一列
            for(var i = 0; i<waterFall.col.length; i++){
                if(waterFall.col[i] < min){
                    idx = i;
                    min = waterFall.col[i];
                }
            }

            $cur.css({
                left: waterFall.nodeWidth * idx,
                top: min
            });

            waterFall.col[idx] = $cur.outerHeight(true) + waterFall.col[idx];
            $('.ct').height(Math.max.apply(null,waterFall.col));

        });

    };

    waterFall.renderData = function (item) {
        console.log(item);
        var tpl = '',
            $node;
        for(var i=0; i<item.length; i++){
            tpl += '<li class="item">';
            tpl += '<a href="'+ item[i].url +'" class="link"><img src="' + item[i].img_url + '" alt=""></a>';
            tpl += '<h4 class="header">'+ item[i].short_name +'</h4>';
            tpl += '<p class="paragraph">'+item[i].short_intro+'</p>';
            tpl += '</li>';
        }
        $node = $(tpl);
        $('.ct').append($node);
        return $node;
    };

    waterFall.createArr();
    waterFall.listenScroll();
    waterFall.checkShow();

});