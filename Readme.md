# infinite

  Scroll infinitely and get new content from a callback function

## Installation

```
$ component install silvinci/infinite
```
## Example

```javascript
var infinite = require("infinite");

infinite(document.querySelector("ul"), function(iteration, next) {
  var self = this;
  request("/data?p=" + iteration, function(data) {
    var li = document.createElement("li")
      , text = document.createTextNode(data);
    li.appendChild(text);

    self.appendChild(li);

    next();
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

### Infinite.on("load", function(iteration, next) {});

  Emitted each time the user scrolls in side the margin.
  The callback is called with `this` as `el` and an argument
  `iteration` which counts how often the callback was called.
  No more load events are emitted, until `next` or
  `Infinite.resume()` gets called.

### Infinite.pause()

  Stop emitting `load` events.

### Infinite.resume()

  Resume emitting `load` events.

## License

  MIT
