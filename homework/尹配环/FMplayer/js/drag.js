/**
 * Created by Administrator on 2016/6/16.
 */

$.fn.drag = function(){
    this.each(function () {
       var _this = $(this);
       var oldx,oldy;
        _this.on('mousedown',function(e){
            //e.pageX = 事件触发时鼠标在页面上的位置
            //$dialog.offset() = dialog 元素相对html绝对位置
            //保存事件触发时鼠标的位置

            var $dialog = $(this),
                evtX = e.pageX - $dialog.offset().left,
                evtY = e.pageY - $dialog.offset().top;
            $dialog.addClass('onMove').data('evtPos',{x:evtX,y:evtY});
            oldx = e.pageX;
            oldy = e.pageY;

        }).on('mouseup',function(e){
            var $dialog = $(this);
            $dialog.removeClass('onMove').removeData('evtPos');
            
            if (((oldx - e.pageX)==0) && ((oldy - e.pageY)==0) && (e.target.parentElement == $dialog.get(0))){
                
                MyPlayer.$musicMa.toggle();

            }
        });
        $('body').on('mousemove',function(e){
            var $onMove = $('.onMove');
            
            if ($onMove.length) {   //触发事件元素的父元素等于绑定事件的元素
                $onMove.offset({    //当有窗口在移动状态时
                    left:e.pageX - $onMove.data('evtPos').x,
                    top:e.pageY - $onMove.data('evtPos').y
                });

            }

        });       
        
    });

};

