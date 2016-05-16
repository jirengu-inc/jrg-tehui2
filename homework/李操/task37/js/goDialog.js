(function($){
	function Dialog(){
		this.createDialog();
		this.bindEvent();
	}
	Dialog.prototype = {
		defaultConfig: {
	      title: '',
	      message: '',
	      isShowCloseBtn: true,
	      isShowConfirmBtn: false,
	      onClose: function(){},
	      onConfirm: function(){}//点击按钮后执行的事件		
		},
		init: function (obj) {
			this.setObj(obj);
			this.configDialog();
			this.showDialog();	  
		},
		setObj:function (obj) {//设置传参不同的情况
	        if(typeof obj === 'string'){//传入字符串
	           this.obj = $.extend({}, this.defaultConfig, {message: obj});
	        }else if (typeof obj === 'object'){//传入对象
	           this.obj = $.extend({}, this.defaultConfig, obj);
	        }		 
		},
		//拼接Dialog的dom
		createDialog: function () {
			var tpl = '';
			    tpl += '<div class="dialog" style="display:none">';
			    tpl += 		'<div class="dialog-header"><h3 class="title"></h3><i class="icon iconfont btn-close">&#xe635;</i></div>';
			    tpl += 		'<div class="dialog-content"></div>';
			    tpl +=	'<div class="dialog-footer">';
			    tpl +=		'<span class="btn btn-confirm">确认</span>';
			    tpl +=		'<span class="btn btn-close">取消</span>';
			    tpl +=	'</div>';
			    tpl += '</div>';
			this.$dialog = $(tpl);
			$('body').append(this.$dialog); 
		},

		//Dialog参数配置
		configDialog: function () {
			 var $dialog = this.$dialog;
		     $dialog.find('.dialog-header .title').text(this.obj.title);
		     $dialog.find('.dialog-content').html(this.obj.message);
			 if (!this.obj.title) {//不传入对应值
			  	$dialog.find('.dialog-header').hide();//隐藏对应dom
			 }else{
			  	$dialog.find('.dialog-header').show();
			 }
			 if(!this.obj.isShowCloseBtn){
		        $dialog.find('.dialog-footer .btn-close').hide();
		     }else{
		        $dialog.find('.dialog-footer .btn-close').show();
		     }
		     if(!this.obj.isShowConfirmBtn){
		        $dialog.find('.dialog-footer .btn-confirm').hide();
		     }else{
		        $dialog.find('.dialog-footer .btn-confirm').show();
		     }
		},
		//Dialog绑定事件
		bindEvent: function(){
			var _this = this;

			//Dialog按钮事件
			_this.$dialog.find('.btn-close').on('click', function(){
		        _this.obj.onClose();
		        _this.hideDialog();
	      	});
	      	_this.$dialog.find('.btn-confirm').on('click', function(){
		        _this.obj.onConfirm();
		        _this.hideDialog();
	        });

	        //Dialog拖拽事件
	        _this.$dialog.on('mousedown', function(e){
	        	var $dialog = $(this);
	        	var evX = e.pageX - $dialog.offset().left,//计算鼠标触发事件点在dialog内距离dialog左边缘的距离
	        		evY = e.pageY - $dialog.offset().top;//计算鼠标触发事件点在dialog内距离dialog上边缘的距离
	        	$dialog.addClass('draggable').data('evPos', {x:evX, y:evY}); //保存事件到 dialog 边缘的距离
	        }).on('mouseup',function () {
	        	$(this).removeClass('draggable').removeData('evPos')
	        });

	        $('body').on('mousemove', function(e){
		        $('.draggable').length && $('.draggable').offset({
		          top: e.pageY-$('.draggable').data('evPos').y, //当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
		          left: e.pageX-$('.draggable').data('evPos').x
		        });
	        });
		},


		showDialog: function(){
	      this.$dialog.show();
	    },

	    hideDialog: function(){
	      this.$dialog.hide();
	    }
	};

	$.fn.goDialog = function (obj) {	
		console.log(this);
		var dialog =  new Dialog();
		return dialog.init(obj);
	}
})(jQuery,window,document);