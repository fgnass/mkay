jaykay
======

Lightweight [Jade](http://jade-lang.com)/[HAML](http://haml-lang.com)-like DOM builder for jQuery

Why?
----

Because building DOM fragments with plain jQuery is noisy:
  
    $('<div id="foo" class="bar">').text('Hello').appendTo('body')

With jaykay this boils down to: 

    $('body').K('#foo.bar', 'Hello')
    
### Why K?

Because the letter __K__ visually resembles a less-than sign (|__<__).
But also because it ma__K__es new elements.

Usage
-----

`jQuery.K(expression [, child, ...])`

Returns a jQuery chain with a new element created from an expression.

Additional arguments will be appended to the newly created element.
If a string is passed as child it will be converted into a TextNode.
All other types are directly passed to jQuery's
[.append()](http://api.jquery.com/append/) method, hence DOM nodes, 
jQuery objects and functions are supported.

`.K(expression [, child, ...])`

Appends and returns the newly created element. This allows you to set
attributes or CSS properties of the new element with jQuery's built-in
methods:

    $('body').K('#foo').css('font-size', 'x-large');

You may call jQuery's [.end()](http://api.jquery.com/end/) method in
order to restore the previous chain. Instead of writing `.end().K(...)`
you may also use the short-hand `.X()`. It's called __X__ because it 
visually resembles two angle brackets `><`:

    $('body').K('#foo').css('font-size', 'x-large').X('#bar');

