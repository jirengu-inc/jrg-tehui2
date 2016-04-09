

// 具体思路：
// 1. 根据浏览器宽度决定生成几列
//
// 2. 生成一个数组（用来存放每一列的总高度），数组长度为计算出来的列数，数组的每一项初始值设置为0
//
// 3. 每次添加完元素之后，计算哪一列总长度最短，然后将下一个元素添加进这一列
//
// 4. 每次添加完之后更新数组数值（每一列的高度）

$(function () {

    function render() {

        var $item = $('.item'),
            itemWidth = $item.outerWidth(true);

        var col = [],
            colNum = parseInt($(window).width() / itemWidth);

        for(var i = 0; i<colNum; i++){
            col.push(0);
        }

        $item.each(function () {

            var $cur = $(this);

            var idx = 0,
                min = col[0];

            // 找出最短的一列
            for(var i = 0; i<col.length; i++){
                if(col[i] < min){
                    idx = i;
                    min = col[i];
                }
            }


            $cur.css({
                left: itemWidth * idx,
                top: min
            });

            col[idx] = $cur.outerHeight(true) + col[idx];

        });


    }

    render();

    $(window).on('resize',function () {
        render();
    });


});