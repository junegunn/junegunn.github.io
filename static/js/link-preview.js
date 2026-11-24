// Show a preview of the target section when hovering over an in-page link
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;

  var SHOW_DELAY = 300;
  var HIDE_DELAY = 200;
  var MAX_ELEMENTS = 6;

  var popup = document.createElement('div');
  popup.className = 'link-preview markdown markdown-inner';
  popup.hidden = true;
  document.body.appendChild(popup);

  var current = null;
  var showTimer = null;
  var hideTimer = null;

  function headingLevel(el) {
    var m = /^H([1-6])$/.exec(el.tagName);
    return m ? +m[1] : 0;
  }

  // The target element, followed by its siblings up to the next heading of
  // the same or higher level
  function extract(target) {
    var frag = document.createDocumentFragment();
    var level = headingLevel(target);
    var el = target;
    for (var i = 0; el && i < MAX_ELEMENTS; i++, el = el.nextElementSibling) {
      var l = headingLevel(el);
      if (i > 0 && l && (!level || l <= level)) break;
      var clone = el.cloneNode(true);
      clone.querySelectorAll('a.anchor').forEach(function (a) { a.remove(); });
      clone.querySelectorAll('[id]').forEach(function (e) { e.removeAttribute('id'); });
      clone.removeAttribute('id');
      frag.appendChild(clone);
      if (!level) break;
    }
    return frag;
  }

  function place(link) {
    var r = link.getBoundingClientRect();
    var margin = 8;
    var w = popup.offsetWidth;
    var h = popup.offsetHeight;
    var left = Math.min(r.left, window.innerWidth - w - margin);
    var top = r.bottom + margin;
    if (top + h > window.innerHeight && r.top - h - margin > 0) {
      top = r.top - h - margin;
    }
    popup.style.left = Math.max(margin, left) + 'px';
    popup.style.top = top + 'px';
  }

  function show(link) {
    var id = decodeURIComponent(link.hash.slice(1));
    var target = id && document.getElementById(id);
    if (!target) return;
    popup.replaceChildren(extract(target));
    popup.scrollTop = 0;
    popup.hidden = false;
    place(link);
    current = link;
  }

  function hide() {
    popup.hidden = true;
    current = null;
  }

  function inPageLink(el) {
    var a = el.closest && el.closest('.markdown a[href^="#"]');
    if (!a || a.classList.contains('anchor') || popup.contains(a)) return null;
    return a;
  }

  document.addEventListener('mouseover', function (e) {
    if (popup.contains(e.target)) {
      clearTimeout(hideTimer);
      return;
    }
    var a = inPageLink(e.target);
    if (!a) return;
    clearTimeout(hideTimer);
    if (a === current) return;
    clearTimeout(showTimer);
    showTimer = setTimeout(function () { show(a); }, SHOW_DELAY);
  });

  document.addEventListener('mouseout', function (e) {
    var from = inPageLink(e.target) || (popup.contains(e.target) && popup);
    if (!from) return;
    if (e.relatedTarget && (from.contains(e.relatedTarget) || popup.contains(e.relatedTarget))) return;
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, HIDE_DELAY);
  });

  document.addEventListener('click', function (e) {
    if (inPageLink(e.target)) {
      clearTimeout(showTimer);
      hide();
    }
  });

  window.addEventListener('scroll', function () {
    if (current) hide();
  }, { passive: true });
})();
