/**
 * Module dependencies.
 */

var events = require("events")
  , Emitter = require("emitter");

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
  
  // listen on scroll event
  this.events = events(el, this);
  this.events.bind("scroll");

  // internal event handling
  this.on("loaded", this.append);

  // loading check
  this.loading = false;
  this.ended = false;
  this.on("load", function() { this.loading = true; });
  this.on("loaded", function() { this.loading = false; });
  this.once("end", function() { this.loading = false; this.ened = true; });
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
  if(this.el.scrollHeight <= this.el.scrollTop + this.el.clientHeight + this.margin) {
    this.emit("scroll");
    if(!this.loading && !this.ended) this.load(this.iteration++);
  }
};

/**
 * Load content.
 *
 * @param {Number} iteration
 * @api public
 */

Infinite.prototype.load = function(iteration) {
  var self = this;
  
  this.emit("load", iteration);

  this.loadCallback.call(this.el, iteration, this, function(elements) {
    if(elements) {
      if(elements instanceof Array)
        self.emit("loaded", elements);
      else
        self.emit("loaded", [elements]);
    } else {
      self.emit("end");
    }
    
    // re-emit scroll event, if the user passed the mark again
    self.onscroll();
  });
};

/**
 * Append content.
 *
 * @param {Array} elements Array of DOMElements
 * @api public
 */

Infinite.prototype.append = function(elements) {
  elements.forEach(function(element) {
    this.el.appendChild(element);
  });
};