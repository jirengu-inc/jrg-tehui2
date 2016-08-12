define(['jquery'], function($) {

	function Exposure($node) {
		this.$node = $node;
		this.init(this.$node);
	}

	Exposure.prototype.init = function() {
		this.hide();
		this.bind();
	}

	Exposure.prototype.hide = function() {
		this.$node.css('opacity', 0);
	}

	Exposure.prototype.isVisible = function($node) {
		var nodeTop = this.$node.offset().top;
		var winH = $(window).height();
		if ($(window).scrollTop() + winH > nodeTop) {
			return true;
		}
		return false;
	}

	Exposure.prototype.bind = function() {
		var me = this;

		$(window).on('scroll', function() {
			if (me.isVisible(me.$node)) {
				me.$node.animate({
					'opacity': '1'
				}, 800)
			}
		})
	}

	return Exposure
})