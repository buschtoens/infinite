/**
 * Module dependencies.
 */

var events = require("events");

/**
 * Expose `Infinite`.
 */

module.exports = Infinite;

/**
 * Initialize a new lazy loading scrolling list.
 *
 * @param {Object} el The DOMElement new content gets appended to.
 * @param {Function} loadCallback The function returning new content.
 * @api public
 */

function Infinite(el, loadCallback) {
  this.el = el;
  this.loadCallback = loadCallback;
	
	this.margin = 300;
	this.iteration = 0;
	this.loading = false;
	this.empty = false;
	
	this.events = events(el, this);
	this.events.bind("scroll");
}

/**
 * Handle a scroll event.
 *
 * @param {Object} event
 * @api public
 */

Infinite.prototype.onscroll = function() {
	if(!this.loading && !this.empty
	&& this.el.scrollHeight <= this.el.scrollTop + this.el.clientHeight + this.margin) {
		this.load();
	}
};

/**
 * Load content and append it.
 *
 * @api public
 */

Infinite.prototype.load = function() {
	var self = this;
	this.loading = true;
	
	this.loadCallback.call(this.el, this.iteration++, function(err, elements) {
		if(err) {
			if(err == "empty") self.empty = true;
		} else {
			if(elements instanceof Array) {
				elements.forEach(function(element) {
					self.el.appendChild(element);
				});
			} else {
				self.el.appendChild(elements);
			}
		}
		
		self.loading = false;
		
		// re-emit scroll event, maybe the user past the mark again
		self.onscroll();
	});
};