//github.com/fgnass/mkay
(function(document, $) {

/**
 * Lightweight Jade/HAML-like DOM builder for jQuery or zepto.js.
 */
var re = {
  tag: /^(\w+)/,
  id: /#([\w_\-]+)/,
  cls: /\.([^#\[]+)/,
  attr: /\[(.+?)=(.+?)\]/g
};

$.mk = function(s) {
  var tag = (re.tag.exec(s||'')||[,'div'])[1];
  var el = document.createElement(tag);
  var chain = $(el);
  var a = chain.append;
  var id = re.id.exec(s);
  var cls = re.cls.exec(s);

  if (id) (el.id = id[1]);
  if (cls) (el.className = cls[1].replace('.', ' '));

  var m;
  while ((m = re.attr.exec(s))) {
    el.setAttribute(m[1], m[2]);
  }

  for (var i=1; i < arguments.length; i++) {
    var n = arguments[i];
    if (typeof n == 'string') n = document.createTextNode(n);
    $.isArray(n) ? a.apply(chain, n) : a.call(chain, n);
  }

  return chain;
};

$.fn.mk = function(s) {
  var child = (this.constructor.mk || $.mk).apply(this, arguments);
  child._ = this.append(child);
  return child;
};

})(document, this.jQuery || this.Zepto);
