# M'kay

Lightweight [Jade](http://jade-lang.com)/[HAML](http://haml-lang.com)-like DOM builder for jQuery and zepto.js

## Why?

Because building DOM fragments with plain jQuery is [slow](http://jsperf.com/innerhtml-or-dom/4) and noisy:

    $('<div id="foo" class="bar">').text('Hello').appendTo('body')

With m'kay this boils down to:

    $('body').mk('#foo.bar', 'Hello')

## Usage

`$.mk(expression [, child, ...])`

Returns a jQuery/Zepto chain with a new element created from an expression.

Additional arguments will be appended to the newly created element.
If a string is passed as child it will be converted into a TextNode.
All other types are directly passed to jQuery's
[.append()](http://api.jquery.com/append/) method, hence DOM nodes,
jQuery objects and functions are supported.

`.mk(expression [, child, ...])`

Appends and returns the newly created element. This allows you to set
attributes or CSS properties of the new element with jQuery's built-in
methods:

    $('body').mk('#foo').css('font-size', 'x-large');

## Going up again

You can access the parent chain using the `_` property. This allows you to create deeply nested tree structures with one single expression:

```javascript
$('body')
  .mk('ul#foo')
    .mk('li', 'Hello')._
    .mk('li', 'World')._
._.mk('ol#bar')
    .mk('li.even', 'One')._
    .mk('li.odd', 'Two');
```

The resulting HTML will look like this:

```html
<body>
  <ul id="foo">
    <li>Hello</li>
    <li>World</li>
  </ul>
  <ol id="bar">
    <li class="even">One</li>
    <li class="odd">Two</li>
  </ol>
</body>
```

## License

M'kay is is licensed under the terms of the MIT License, see the included LICENSE.txt file.
