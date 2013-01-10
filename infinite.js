/**
 * Module dependencies.
 */

var events = require("events")
  , Emitter = require("emitter")
  , bind = require("bind");

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
  this.el = el;
  if(typeof loadCallback == "function")
    this.on("load", bind(loadCallback, this.el));
  
  this.margin = typeof margin == "number" ? margin : 300;
  this.iteration = 0;

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
  if(!this.pause && this.el.scrollHeight <= this.el.scrollTop + this.el.clientHeight + this.margin) {
    this.emit("load", this.iteration++);
  }
};

/**
 * Pause emitting `load` events.
 *
 * @api public
 */

Infinite.prototype.pause = function() {
  this.pause = true;
  this.emit("pause");
};

/**
 * Resume emitting `load` events.
 *
 * @api public
 */

Infinite.prototype.resume = function() {
  this.pause = false;
  this.emit("resume");
};