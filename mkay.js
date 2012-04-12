//github.com/fgnass/mkay
!function(document, $) {

/**
 * Lightweight Jade/HAML-like DOM builder for jQuery or zepto.js.
 */

var re = {
  tag: /^(\w+)/,
  id: /#([\w_\-]+)/,
  cls: /\.([^#\[]+)/,
  attr: /\[(.+?)=(.+?)\]/g,
  event: /^on(.+)/,
  dots: /\./g
}

function isPlainObject(o) {
  if (!o || o.constructor != Object) return false
  var key
  for (key in o);
  return key === undefined || o.hasOwnProperty(key)
}

function mk(jsonml) {
  if (!$.isArray(jsonml)) return document.createTextNode(jsonml)
  var s = jsonml[0]
    , attrs = jsonml[1]
    , tag = (re.tag.exec(s||'')||[0,'div'])[1]
    , id = re.id.exec(s)
    , cls = re.cls.exec(s)
    , el = document.createElement(tag)
    , chain = $(el)

  if (id) (el.id = id[1])
  if (cls) (el.className = cls[1].replace(re.dots, ' '))

  // Set attributes defined in the expression
  var m
  while (m = re.attr.exec(s))
    el.setAttribute(m[1], m[2])

  // If the 2nd argument is omitted splice an empty object
  if (!isPlainObject(attrs))
    jsonml.splice(1, 0, attrs = {})

  // Set attributes passed as 2nd arg
  $.each(attrs, function(name, val) {
    m = re.event.exec(name)
    if (m) chain.on(m[1], val)
    else if (name == 'class') chain.addClass(val)
    else chain.attr(name, val)
  })

  for (var i=2; i < jsonml.length; i++) {
    var n = jsonml[i]
    if (n.appendTo) n.appendTo(el)
    else chain.append(mk(n))
  }
  return el
}

$.mk = function(jsonml) {
  var args = Array.prototype.slice.call(arguments)
  if (!$.isArray(jsonml)) jsonml = args // make the outer [] optional
  else if (args.length>1) return $($.map(args, mk)) // multiple elemens
  return $(mk(jsonml))
}

$.fn.mk = function(s) {
  var child = (this.constructor.mk || $.mk).apply(this, arguments)
  child._ = this.append(child)
  return child
}

}(document, this.jQuery || this.Zepto)
