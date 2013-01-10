# infinite

  Scroll infinitely and get new content from a callback function

## Installation

```
$ component install silvinci/infinite
```

## API

### Infinite(el, loadCallback)

  Initialize infinite scoll instance on `el`, which is a `DOMElement`.
  `loadCallback` is a `Function` that gets called, everytime new content
  is requested. It returns a `DOMElement` or an array of `DOMElement`s.

### Infinite.onscroll()

  Manually issue a scrollevent, triggering a content load, if no other
  load is currently active.

### Infinite.load()

  Force loading new content. Not recommended. Use `Infinite.onscroll()`
  instead.

### Infinite.stop()

  Stop loading new content on scroll events.

## License

  MIT
