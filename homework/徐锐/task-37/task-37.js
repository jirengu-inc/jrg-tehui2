$(function () {


    function ModalDialog() {
        this.createDialog();
        this.bindEvents();
        this.dragDialog();
    }

    ModalDialog.prototype.createDialog = function () {
        var tpl = '';
        tpl += '<div class="wrap"><div class="ct">'
            + '<div class="dialog">'
            + '<div class="header">'
            + '<h4>饥人谷</h4>'
            + '<p class="x">x</p>'
            + '</div>'
            + '<p>这里是饥人谷</p>'
            + '<div class="footer">'
            + '<a href="#" class="confirm">确定</a>'
            + '<a href="#" class="cancel">取消</a>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        this.$tpl = $(tpl);
        $(this.$tpl).appendTo($('body'));
    };

    ModalDialog.prototype.bindEvents = function () {
        var self = this;
        // console.log(this);
        self.$tpl.find('.x').on('click',function () {
            self.removeDialog();
        });
        self.$tpl.find('.cancel').on('click',function () {
            self.removeDialog();
        });
        self.$tpl.find('.confirm').on('click',function () {
            self.removeDialog();
        });
        $('.button').on('click',function () {
            self.showDialog();
        });
    };

    ModalDialog.prototype.showDialog = function () {
        (this.$tpl).show();
    };
    ModalDialog.prototype.removeDialog = function () {
        this.$tpl.remove();
    };

    ModalDialog.prototype.open = function () {
        // console.log(this);
        this.showDialog();
    };


    ModalDialog.prototype.dragDialog = function () {

        var _move = false;
        var _x, _y;//鼠标离控件左上角的相对位置

        $('.wrap').on('mousedown',function (e) {
            me = $(this);
            _move = true;
            _x = e.pageX - parseInt($(this).find('.ct').css("left"));

            _y = e.pageY - parseInt($(this).find('.ct').css("top"));
            $(this).addClass('dragging');

            return false;
        });
        $(document).on('mousemove',function (e) {

            if (_move) {
                var x = e.pageX - _x;//移动时根据鼠标位置计算控件左上角的绝对位置
                var y = e.pageY - _y;

                me.find('.ct').css({top: y, left: x});//控件新位置
            }

        }).on('mouseup',function () {
            if(_move) {
                _move = false;
                me.removeClass('dragging');
            }
        });
    };

    $('.btn1').on('click',function () {
       var dialog = new ModalDialog();
        dialog.open();
    });
    $('.btn2').on('click',function () {
        var dialog = new ModalDialog();
        dialog.open();
    });
    $('.btn3').on('click',function () {
        var dialog = new ModalDialog();
        dialog.open();
    });
    $('.btn4').on('click',function () {
        var dialog = new ModalDialog();
        dialog.open();
    });
    $('.btn5').on('click',function () {
        var dialog = new ModalDialog();
        dialog.open();
    });

});