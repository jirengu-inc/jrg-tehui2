

$(function () {

    $('.box').on('mouseover','li',function () {
        $(this).find('.now').show();
        $(this).css('opacity','0.6');
    }).on('mouseleave','li',function () {
        $(this).find('.now').hide();
        $(this).css('opacity','');
    });

    var products = [
        {
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '珂兰 黄金手 猴哥款',
            price: '￥405.00'
        },{
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '珂兰 黄金转运珠 猴哥款',
            price: '￥100.00'
        },{
            img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
            name: '珂兰 黄金手链 3D猴哥款',
            price: '￥45.00'
        }
    ];

    $('#add').on('click',function () {

        var newLi = '';

        for (var i=0; i<products.length; i++){
            var newImg = '<img src='+ products[i].img +'>';
            var newName = '<p>'+ products[i].name + '</p>';
            var newPrice = '<p>'+ products[i].price + '</p>';
            newLi += '<li>'+ newImg + newName + newPrice + '<div class="now">立即抢购</div>' +'</li>';
        }

        var newUl = '<ul>'+ newLi +'</ul>';
        
        $('.box:last').append(newUl);
        
    });


});