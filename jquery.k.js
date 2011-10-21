/**
 * Lightweight Jade/HAML-like DOM builder for jQuery.
 */
(function() {

var re = {
  tag: /^(\w+)/,
  id: /#(\w+)/,
  cls: /\.([^#]+)/
};

$.K = function(s) {
  var tag = (re.tag.exec(s)||[,'div'])[1];
  var el = document.createElement(tag);
  var id = re.id.exec(s);
  var cls = re.cls.exec(s);
  if (id) (el.id = id[1]);
  if (cls) (el.className = cls[1].replace('.', ' '));
  var ret = $(el);
  for (var i=1; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == 'string') child = document.createTextNode(child);
    ret.append(child);
  }
  return ret;
};

$.fn.K = function(s) {
  var ret = $.K.apply(this, arguments);
  this.append(ret);
  ret.prevObject = this;
  return ret;
};

$.fn.X = function() {
  return $.fn.K.apply(this.end(), arguments);
};

})();