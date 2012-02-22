/**
 * Lightweight Jade/HAML-like DOM builder for jQuery or zepto.js.
 */
(function($) {

var re = {
  tag: /^(\w+)/,
  id: /#(\w+)/,
  cls: /\.([^#]+)/
};

$.mk = function(s) {
  var tag = (re.tag.exec(s||'')||[,'div'])[1];
  var el = document.createElement(tag);
  var chain = $(el);

  var id = re.id.exec(s);
  var cls = re.cls.exec(s);

  if (id) (el.id = id[1]);
  if (cls) (el.className = cls[1].replace('.', ' '));

  for (var i=1; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == 'string') child = document.createTextNode(child);
    chain.append(child);
  }

  return chain;
};

$.fn.mk = function(s) {
  var child = (this.constructor.mk || $.mk).apply(this, arguments);
  child._ = this.append(child);
  return child;
};

})(jQuery);
