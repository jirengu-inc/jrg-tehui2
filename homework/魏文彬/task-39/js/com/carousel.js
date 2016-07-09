define(['jquery'],function($){

    function carousel($node){
        this.curNum=0;
        this.turning=false;
        this.imgWidth=$(window).width();
        this.$win=$node.find('.window');
        this.imgCount=this.$win.children().length;
        this.init();
        this.$bullet=$node.find('.bullet');
        this.bind();
        this.autoPlay();
    };

    carousel.prototype={

      init:function(){
        this.$win.find('.box').css('width',this.imgWidth);
        this.$win.find('li').css('width',this.imgWidth);    
        this.$win.prepend(this.$win.children().last().clone());
        this.$win.append(this.$win.children().eq(1).clone());                    
        this.$win.css('width',(this.imgCount+2)*this.imgWidth);                         
        this.$win.css('left',-this.imgWidth);
        this.$li=this.$win.find('li');
        this.$box=this.$win.find('.box');
        this.setBg(0);
        this.$box.eq(this.imgCount+1).css('background-image','url('+this.$box.eq(this.imgCount+1).attr('data-img')+')');
      },

      bind:function(){
        var _this=this;
        $('.bullet').on('click','li',function(){
          _this.turn($(this).index()-_this.curNum);                            
        });
      },

      autoPlay: function(){
        var _this=this;
        var clock=setInterval(function(){
          this.turn(1);
        },2000);
      },

      turn: function(num){                                            
        if(this.turning) return;
        console.log(1);
        _this=this;
        this.turning=true;
        this.setBg(num);
        this.targetNum=(num+this.curNum+4)%(this.imgCount);               
        this.$win.animate({left:'-='+(num*this.imgWidth)},function(){      
          if(_this.targetNum===0){
            _this.$win.css('left',-_this.imgWidth);                    
          };
          if(_this.targetNum===3){                                    
            _this.$win.css('left',-(_this.imgCount)*this.imgWidth);
          } 
          _this.turning=false; 
        });
        this.$bullet.children().removeClass('active');
        this.$bullet.children().eq(this.targetNum).addClass('active');
        this.curNum=this.targetNum;
      },

      setBg: function(num){ 
        var bgNum=(num+this.curNum+4)%(this.imgCount);
        if(this.$box.eq(bgNum+1).data('loaded'))return;
        this.$box.eq(bgNum+1).css('background-image','url('+$('.box').eq(bgNum+1).attr('data-img')+')');
        this.$box.eq(bgNum+1).data('loaded',true);
      }
    };
        return carousel;
});