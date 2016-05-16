$('.btn1').on('click',function () {
	 $(this).goDialog("This is a dialog");
});



$('.btn2').on('click',function () {
	 $(this).goDialog('<a href="http://licao404.coding.io">My Blog</a>');
});



$('.btn3').on('click',function(){
  $(this).goDialog({
    title: 'Message',
    message: '确认删除么',
    isShowCloseBtn: true,
    isShowConfirmBtn: true,
    onConfirm: function(){
      alert('已删除');
    }
  });
});


var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表1</li><li>列表1</li></ul>';
$('.btn4').on('click',function(){
  $(this).goDialog({
    title: 'Message',
    message: tpl,
    isShowCloseBtn: true,
    isShowConfirmBtn: true,
    onClose: function(){
      alert('已取消')
    },
    onConfirm: function(){
      alert('确定');
    }
  });
});


$('.btn5').on('click',function(){
  $(this).goDialog({
    title: 'Message',
    message: 'Hello World',
    isShowCloseBtn: false,
    isShowConfirmBtn: false
  });
});
