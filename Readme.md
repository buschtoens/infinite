# infinite ![Bitdeli](https://d2weczhvl823v0.cloudfront.net/silvinci/infinite/trend.png)
  Scroll infinitely and get new content from a callback function
  
  By default `infinite` listens on the `scroll` event. If the element
  has no scrollbars, `infinite` will run on each `mousewheel` event.

## Installation

```
$ component install silvinci/infinite
```
## Example

```javascript
var infinite = require("infinite");

infinite(document.querySelector("ul"), function(iteration) {
  var self = this;
  request("/data?p=" + iteration, function(data) {
    var li = document.createElement("li")
      , text = document.createTextNode(data);
    li.appendChild(text);

    self.appendChild(li);
  });
});
```

## API

### Infinite(el, loadCallback, [margin])

  Listen for scroll events on `el`. Call `loadCallback`, when the
  scrollbar of `el` hits the end. Optionally specify a `margin`
  so that `loadCallback` gets called before the scrollbar hits
  the end.

### Infinite.onscroll()

  Manually issue a scrollevent, triggering `loadCallback`, if the
  scrollbar is in the margin or at the end.

### Infinite.on("load", function(iteration, delta) {});

  Emitted each time the user scrolls inside the margin.
  The callback is called with `this` as `el` and the arguments
  `iteration` which counts how often the callback was called (starting at `0`)
  and `delta` which returns the delta to the previous state (`-1` or `1`).

### Infinite.pause()

  Stop emitting `load` events.

### Infinite.resume()

  Resume emitting `load` events.

### Infinite.bind(element)

  Listen for events on the given `element`. Will unregister all events from an
  element that may have been registered previously.

### Infinite.unbind()

  Unbind from the event, virtually deconstructing this instance of `Infinite`.

## License

  MIT
