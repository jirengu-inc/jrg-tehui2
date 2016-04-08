

$(function () {


    $('.tab>li').on('mouseover',function () {
        $('.tab>li').attr('class','');
        $(this).parents('#section').find('.box').css('display','none');
        $(this).attr('class','active');
        $(this).parents('#section').find('.box').eq($(this).index()).css('display','block');
    });
    
    $('.box li').on('mouseover',function () {
        $(this).find('.now').show();
        $(this).css('opacity','0.6');
    }).on('mouseleave',function () {
        $(this).find('.now').hide();
        $(this).css('opacity','');
    });



});