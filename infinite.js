/**
 * Module dependencies.
 */

var events = require("events")
  , Emitter = require("emitter")
  , bind = require("bind")
  , debounce = require("debounce");

/**
 * Expose `Infinite`.
 */

module.exports = Infinite;

/**
 * Initialize a new lazy loading scrolling list.
 *
 * @param {Object} el The DOMElement to listen of for scroll events.
 * @param {Function} loadCallback
 * @param {Number} margin Number of pixels to pre-trigger load.
 * @api public
 */

function Infinite(el, loadCallback, margin) {
  if(!(this instanceof Infinite))
    return new Infinite(el, loadCallback, margin);

  this.el = el;
  if(typeof loadCallback == "function")
    this.on("load", bind(this.el, loadCallback));
  
  this.margin = typeof margin == "number" ? margin : 0;
  this.iteration = 0;
  this.paused = false;

  // listen on scroll event
  this.events = events(el, this);
  this.events.bind("scroll");
}

// Inherit from Emitter
Emitter(Infinite.prototype);

/**
 * Handle a scroll event.
 *
 * @param {Object} event
 * @api public
 */

Infinite.prototype.onscroll = function() {
  if(!this.paused && this.el.scrollHeight <= this.el.scrollTop + this.el.clientHeight + this.margin) {
    debounce(this.load, 100, true);
  }
};

/**
 * Force a load.
 *
 * @api public
 */

Infinite.prototype.load = function() {
  this.emit("load", this.iteration++);
};

/**
 * Pause emitting `load` events.
 *
 * @api public
 */

Infinite.prototype.pause = function() {
  this.paused = true;
  this.emit("pause");
};

/**
 * Resume emitting `load` events.
 *
 * @api public
 */

Infinite.prototype.resume = function() {
  this.paused = false;
  this.emit("resume");
};