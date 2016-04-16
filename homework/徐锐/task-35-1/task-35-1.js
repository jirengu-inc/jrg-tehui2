function Carousel($node){

    this.$node = $node;
    this.$imgCt = $node.find(".img-ct");
    this.$pre = $node.find('.pre');
    this.$next = $node.find('.next');
    this.$bul = $node.find('.bullet');
    this.$img = this.$imgCt.find('img');
    this.$item = this.$imgCt.children();
    this.ready = false;
    this.curidx = 0;
    this.imgWidth = this.$img.width();

    this.setItems();
    this.bindEvents();
    this.autoChange();

}

Carousel.prototype = {

    toNext: function (idx) {

        var self = this,
            idx = idx || 1;

        if(!self.ready) {
            self.ready = true;
            this.$imgCt.animate({left: '-=' + this.imgWidth * idx}, function () {
                self.curidx = (self.curidx + idx) % self.$item.length;
                if(self.curidx == 0){
                    self.$imgCt.css({left: 0 - self.imgWidth});
                }
                self.ready = false;
                self.toLocation();
            });
        }
    },

    toPre: function (idx) {

        var self = this,
            idx = idx || 1;

        if (!self.ready) {
            self.ready = true;
            console.log(this.$imgCt)
            this.$imgCt.animate({left: '+=' + this.imgWidth * idx}, function () {
                self.curidx = (self.$item.length + self.curidx - idx) % self.$item.length;
                if(self.curidx == self.$item.length - 1){
                    self.$imgCt.css({left: 0 - self.imgWidth * self.$item.length});
                }
                self.ready = false;
                self.toLocation();
            });
        }
    },

    autoChange: function () {

        var self = this;

        setInterval(function () {
            self.toNext();
        },4000);
    },

    toLocation: function () {
        this.$bul.find('li').removeClass('active').eq(this.curidx).addClass('active');
    },

    bindEvents: function () {

        var self = this;

        // 左右按钮的显示和隐藏
        self.$node.on('mouseover',function () {
            self.$node.find('.arrow').css('display','block');
        }).on('mouseleave',function () {
            self.$node.find('.arrow').css('display','none');
        });

        // 左右按钮的点击事件
        self.$next.on('click',function () {
            self.toNext();
        });
        self.$pre.on('click',function () {
            self.toPre();
        });

        // 在切换到第一张或者最后一张时重置
        self.$bul.find('li').on('click',function () {

            var idx = $(self).index();

            if(idx > self.curidx){
                console.log(self.curidx)
                self.toNext(idx - self.curidx);
            } else if(idx < self.curidx){
                self.toPre(self.curidx - idx);
            }
        });

    },

    setItems: function () {

        this.$imgCt.append(this.$item.first().clone());
        this.$imgCt.prepend(this.$item.last().clone());
        this.$imgCt.css('left',0 - this.imgWidth);
        this.$imgCt.css('width', this.imgWidth * this.$imgCt.children().length);
    }

};

var $node1 = $('.carousel').eq(0);
var $node2 = $('.carousel').eq(1);
var carousel1 = new Carousel($node1);
var carousel2 = new Carousel($node2);