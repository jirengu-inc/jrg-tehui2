function MultiCarousel($node, num) {
    this.imgCt = $node;
    this.pre = this.imgCt.siblings('.pre');
    this.next = this.imgCt.siblings('.next');
    this.bullet = this.imgCt.siblings('.bullet');
    this.items = this.imgCt.children();
    this.imgCount = this.items.length;
    this.nowIdx = num || 0;
    this.isAnimate = false;
    this.bind();
    this.play(this.nowIdx);
    this.autoPlay();
}
MultiCarousel.prototype = {
    bind: function () {
        var _this = this;
        _this.pre.on('click', function (e) {
            e.preventDefault();
            _this.playPre();
        });

        _this.next.on('click', function (e) {
            e.preventDefault();
            _this.playNext();
        });

        _this.bullet.find('li').on('click', function () {
            var idx = $(this).index();
            _this.play(idx);
        });
    },
    playPre: function () {
        var _this = this;
        _this.play((_this.imgCount + _this.nowIdx - 1) % _this.imgCount);
    },
    playNext: function () {
        var _this = this;
        _this.play((_this.nowIdx + 1) % _this.imgCount);
    },
    play: function (idx) {
        var _this = this;
        if (_this.isAnimate) return;
        _this.isAnimate = true;
        _this.items.eq(_this.nowIdx).fadeOut(500);
        _this.items.eq(idx).fadeIn(500, function () {
            _this.isAnimate = false;
        });
        _this.nowIdx = idx;
        _this.setBullet(idx);
    },
    setBullet: function (idx) {
        var _this = this;
        _this.bullet.children().removeClass('active').eq(idx).addClass('active');
    },
    autoPlay: function () {
        var _this = this;
        setInterval(function () {
            _this.playNext();
        }, 2000);
    }
};


