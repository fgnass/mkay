# M'kay

Lightweight [Jade](http://jade-lang.com)/[HAML](http://haml-lang.com)-like DOM builder for jQuery and Zepto.js

## Why?

Because building DOM fragments with plain jQuery is [slow](http://jsperf.com/innerhtml-or-dom/4) and noisy:

```javascript
$('<div id="foo" class="bar">').text('Hello').appendTo('body')
```

With M'kay this boils down to:

```javascript
$('body').mk('#foo.bar', 'Hello')
```

But there's even more! With M'kay you can ...

* write logic in JS rather than some awkward templating language
* save node references upon creation instead of querying the DOM later
* validate your code with JSHint & Co.
* relax – no innerHTML == no XSS

## Usage Examples

    $.mk()                              <div></div>
    $.mk('h1')                          <h1></h1>
    $.mk('.foo')                        <div class="foo"></div>

    $.mk('h1#title')                    <h1 id="title"></h1>
    $.mk('h1#title.big')                <h1 id="title" class="big"></h1>
    $.mk('input[type=text][name=foo]')  <input type="text" name="foo">

As you see, you can specify the tag-name, class, id as well as attributes in a
familiar, CSS-like syntax.

### Nested Elements

To append a text-node to new element, just pass it as additional argument:

    $.mk('h1', 'Hello World')           <h1>Hello World</h1>

In order to append elements you can use nested calls to `$.mk()`:

    $.mk('ul',                          <ul>
      $.mk('li', 'One'),                  <li>One</li>
      $.mk('li', 'Two')                   <li>Two</li>
    )                                   </ul>

### JsonML

For brevity you may also use [JsonML](http://jsonml.org):

    $.mk('ul',                          <ul>
      ['li', 'One'],                      <li>One</li>
      ['li', 'Two']                       <li>Two</li>
    )                                   </ul>

Since M'kay fully supports the JsonML syntax, you can also set attributes by
passing an object as second parameter:

    $.mk('a', {href: 'http://github.com'}, 'GitHub')


### Multiple Elements

In order to create a chain containing multiple elements the first element
must be an array:

    $.mk(['span'], ['span'])             <span></span><span></span>
    $.mk(['em', 'Hello'], ' world')      <em>Hello</em> world

### Create & Append

A common task is to append a newly created element to an existing one. M'kay
therefore provides a plugin method that does just that:

    $('body').mk('h1', 'Hello!')

The `.mk()` plugin returns a chain containing the newly created element. This
allows you to easily add event listeners like this:

    $('body').mk('.btn', 'Click Me')
      .click(function() { alert('click') })


## License

M'kay is is licensed under the terms of the MIT License, see the included LICENSE.txt file.
