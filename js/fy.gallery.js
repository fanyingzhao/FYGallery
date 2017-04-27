;(function($){

	$.Gallery = function(options, element) {
		this.$ele = $(element);
		this._init(options);
	};

	$.Gallery.defaults = {
		currentIndex	: 0,
		autoplay		: false,
		interval		: 2000,
		debug			: true
	};

	$.Gallery.prototype = {
		_init : function(options) {
			this.options = $.extend({}, $.Gallery.defaults, options);

			this.$items = this.$ele.find('>span');
			this.currentIndex = this.options.currentIndex;

			this._currentItem, this._leftItem, this._rightItem, this._outLeftItem, this._outRightItem;

			this.$navPrev = this.$ele.find('.dg-prev');
			this.$navNext = this.$ele.find('.dg-next');

			this._layout();
			this._loadEvent();
			this._autoPlay();
		},

		_layout : function() {
			this.$ele.css({
				'perspective'		: 1000 + 'px',
				'transform-style'	: 'preserve-3d'
			});

			this.$items.css({
				'opacity' : 0,
				'visibility' : 'hidden'
			});

			this.currentItem = this.$items.eq(this.currentIndex);
			this.leftItem = this.$items.eq(this._getPreviousIndex(this.currentIndex));
			this.rightItem = this.$items.eq(this._getNextIndex(this.currentIndex));
			this.outLeftItem = this.$items.eq(this._getPreviousIndex(this.$items.index(this.leftItem)));
			this.outRightItem = this.$items.eq(this._getNextIndex(this.$items.index(this.rightItem)));
		},

		_loadEvent : function () {
			var _self = this;
			this.$navPrev.on('click', function() {
				_self._log('left click');

				_self._cut('pre', _self);
			});

			this.$navNext.on('click', function() {
				_self._log('right click');

				_self._cut('next', _self);
			});
		},

		// tools
		_autoPlay : function() {
			var _self = this;

			setTimeout(function(){
				_self._autoPlay();

				if (_self.options['autoplay']) {
					_self._cut('next');
				}
			}, _self.options['interval']);
		},

		_cut : function(direction, _self = this) {
			_self.outLeftItem.addClass('dg-transition');
			_self.leftItem.addClass('dg-transition');
			_self.currentItem.addClass('dg-transition');
			_self.rightItem.addClass('dg-transition');
			_self.outRightItem.addClass('dg-transition');

			if (direction == 'pre') {
				_self.outRightItem = _self.rightItem;
				_self.rightItem = _self.currentItem;
				_self.currentItem = _self.leftItem;
				_self.leftItem = _self.outLeftItem;
				_self.outLeftItem = _self.$items.eq(_self._getPreviousIndex(_self.$items.index(_self.leftItem)));
				_self.currentIndex = _self.$items.index(_self.currentItem);
			}else if (direction == 'next') {
				_self.outLeftItem = _self.leftItem;
				_self.leftItem = _self.currentItem;
				_self.currentItem = _self.rightItem;
				_self.rightItem = _self.outRightItem;
				_self.outRightItem = _self.$items.eq(_self._getNextIndex(_self.$items.index(_self.rightItem)));
				_self.currentIndex = _self.$items.index(_self.currentItem);
			}else {
				this._log('参数错误');
			}
		},

		_getPreviousIndex : function (index) {
			if (index <= 0) {
				return this.$items.length - 1;
			}

			return index - 1;
		},

		_getNextIndex : function (index) {
			if (index >= this.$items.length - 1) {
				return 0;
			}

			return index + 1;
		},

		_log : function(message, error = false) {
			if (self.console && !this.options['debug']) {
				if (false) {
					console.error(message);
				}else {
					console.log(message);
				}
			}
		},

		// get,set
		get currentItem() {
			return $(this._currentItem);
		},
		set currentItem(item) {
			$(item).css({
				'-webkit-transform'	: 'translateZ(0px)',
				'-moz-transform'	: 'translateZ(0px)',
				'-o-transform'		: 'translateZ(0px)',
				'-ms-transform'		: 'translateZ(0px)',
				'transform'			: 'translateZ(0px)',
				'opacity'			: 1,
				'visibility'		: 'visible'
			});
			this._currentItem = item;
		},
		get leftItem() {
			return $(this._leftItem);
		},
		set leftItem(item) {
			$(item).css({
				'-webkit-transform'	: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
				'-moz-transform'	: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
				'-o-transform'		: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
				'-ms-transform'		: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
				'transform'			: 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
				'opacity'			: 1,
				'visibility'		: 'visible'
			});
			this._leftItem = item;
		},
		get rightItem() {
			return $(this._rightItem);
		},
		set rightItem(item) {
			$(item).css({
				'-webkit-transform'	: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
				'-moz-transform'	: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
				'-o-transform'		: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
				'-ms-transform'		: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
				'transform'			: 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
				'opacity'			: 1,
				'visibility'		: 'visible'
			});
			this._rightItem = item; 
		},
		get outLeftItem() {
			return $(this._outLeftItem);
		},
		set outLeftItem(item) {
			$(item).css({
				'-webkit-transform'	: 'translate(-450px) translateZ(-300px) rotateY(45deg)',
				'-moz-transform'	: 'translate(-450px) translateZ(-300px) rotateY(45deg)',
				'-o-transform'		: 'translate(-450px) translateZ(-300px) rotateY(45deg)',
				'-ms-transform'		: 'translate(-450px) translateZ(-300px) rotateY(45deg)',
				'transform'			: 'translate(-450px) translateZ(-300px) rotateY(45deg)',
				'opacity'			: 0,
				'visibility'		: 'hidden'
			});
			this._outLeftItem = item;
		},
		get outRightItem() {
			return $(this._outRightItem);
		},
		set outRightItem(item) {
			$(item).css({
					'-webkit-transform'	: 'translate(450px) translateZ(-300px) rotateY(-45deg)',
					'-moz-transform'	: 'translate(450px) translateZ(-300px) rotateY(-45deg)',
					'-o-transform'		: 'translate(450px) translateZ(-300px) rotateY(-45deg)',
					'-ms-transform'		: 'translate(450px) translateZ(-300px) rotateY(-45deg)',
					'transform'			: 'translate(450px) translateZ(-300px) rotateY(-45deg)',
					'opacity'			: 0,
					'visibility'		: 'hidden'
			});
			this._outRightItem = item;
		}
	};

	$.fn.gallery = function(options) {
		this.each(function() {
			var instance = $.data(this, 'gallery');
			if (!instance) {
				var obj = new $.Gallery(options, this);
				$.data(this, 'gallery', obj);
			}
		});

		return this;
	};
})(jQuery);