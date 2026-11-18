/* Live app screens and pop-out callouts. Runs alongside deck.js and reacts to its classes:
   a slide is showing when it has .on, a step is hidden while it has .hide. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scale each live screen (drawn at 1278 x 743) to its browser */
  function fitLive() {
    document.querySelectorAll('.live').forEach(function (l) {
      var w = l.parentNode.offsetWidth; if (w) l.style.transform = 'scale(' + (w / 1278) + ')';
    });
  }

  /* Floating agents riding the dotted orbits */
  var BOT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4"/><rect x="11" y="2.5" width="2" height="4" rx="1"/><circle cx="12" cy="2.5" r="1.6"/><circle cx="9" cy="13" r="1.8" fill="#fff"/><circle cx="15" cy="13" r="1.8" fill="#fff"/><rect x="1.5" y="11" width="2.5" height="4" rx="1.2"/><rect x="20" y="11" width="2.5" height="4" rx="1.2"/></svg>';
  function ellipsePath(rx, ry) {
    var cx = 640, cy = 400;
    return 'path("M ' + (cx - rx) + ' ' + cy + ' a ' + rx + ' ' + ry + ' 0 1 0 ' + 2 * rx + ' 0 a ' + rx + ' ' + ry + ' 0 1 0 ' + -2 * rx + ' 0")';
  }
  document.querySelectorAll('.lv[data-orbits]').forEach(function (lv) {
    var rings = [[300, 170, 70], [480, 260, 95], [660, 360, 120]];
    var svg = '<svg class="orbits" viewBox="0 0 1278 743" aria-hidden="true">' +
      rings.map(function (r, i) { return '<ellipse class="o' + (i + 1) + '" cx="640" cy="400" rx="' + r[0] + '" ry="' + r[1] + '"/>'; }).join('') + '</svg>';
    lv.insertAdjacentHTML('afterbegin', svg);
    var icon = lv.dataset.orbits === 'bot' ? BOT : (document.getElementById(lv.dataset.orbits) || {}).innerHTML || BOT;
    var spots = [[0, 0, 0], [0, .55, 1], [1, .2, 0], [1, .7, 1], [2, .1, 0], [2, .45, 1], [2, .8, 0]];
    spots.forEach(function (s) {
      var r = rings[s[0]], b = document.createElement('span');
      b.className = 'bot' + (s[2] ? ' sm' : '');
      b.innerHTML = icon;
      b.style.offsetPath = ellipsePath(r[0], r[1]);
      b.style.animationDuration = r[2] + 's';
      b.style.animationDelay = (-s[1] * r[2]) + 's';
      b.firstChild.style.animationDelay = (-s[1] * 3) + 's';
      lv.insertBefore(b, lv.children[1]);
    });
  });

  /* What each live screen does while it is showing */
  var acts = window.liveActs = window.liveActs || {};
  var own = {
    project: function (lv, later) {
      var box = lv.querySelector('.search'), txt = box.querySelector('.t'), repos = lv.querySelectorAll('.repo');
      var word = box.dataset.type || '', i = 0;
      box.classList.remove('typing'); txt.textContent = box.dataset.placeholder;
      repos.forEach(function (r) { r.classList.remove('gone', 'pick-me'); });
      later(function () { box.classList.add('typing'); txt.textContent = ''; }, 900);
      (function type() {
        later(function () {
          i++; txt.textContent = word.slice(0, i);
          var q = word.slice(0, i).toLowerCase();
          repos.forEach(function (r) { r.classList.toggle('gone', r.dataset.name.toLowerCase().indexOf(q) < 0); });
          if (i < word.length) type(); else later(function () { lv.querySelector('.repo:not(.gone)').classList.add('pick-me'); }, 500);
        }, i === 0 ? 1200 : 110);
      })();
    },
    paste: function (lv, later) {
      var c = lv.querySelector('.copy'); c.classList.remove('done', 'down');
      later(function () { c.classList.add('down'); }, 1500);
      later(function () { c.classList.remove('down'); c.classList.add('done'); }, 1700);
    }
  };

  var running = new Map();
  function visible(lv) { var s = lv.closest('.slide'); return s && s.classList.contains('on') && !lv.classList.contains('hide'); }
  function sync() {
    document.querySelectorAll('.lv, [data-act]').forEach(function (lv) {
      var on = visible(lv), was = running.has(lv);
      if (on && !was) {
        if (lv.dataset.act && !acts[lv.dataset.act]) return; /* its code hasn't loaded yet; liveSync retries */
        var timers = []; running.set(lv, timers);
        lv.classList.remove('play'); void lv.offsetWidth; lv.classList.add('play');
        var fn = acts[lv.dataset.act];
        if (fn) fn(lv, function (f, ms) { timers.push(setTimeout(f, reduce ? 0 : ms)); });
      } else if (!on && was) {
        running.get(lv).forEach(clearTimeout); running.delete(lv); lv.classList.remove('play');
      }
    });
  }

  /* Pop-outs: lift one region of a screenshot out of the browser, bigger, with a label beside it */
  function offsetIn(el, root) { var x = 0, y = 0; while (el && el !== root) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return [x, y]; }
  function placePops() {
    document.querySelectorAll('.pop').forEach(function (p) {
      var desk = p.closest('.desk'), screen = desk.querySelector('.screen'), img = screen.querySelector('img');
      if (!img) return;
      var nw = +p.dataset.nw || img.naturalWidth || 1189, s = screen.offsetWidth / nw;
      var r = p.dataset.region.split(',').map(Number), z = +p.dataset.zoom || 1.5;
      var o = offsetIn(screen, desk);
      var cx = o[0] + (r[0] + r[2] / 2) * s + (+p.dataset.dx || 0), cy = o[1] + (r[1] + r[3] / 2) * s + (+p.dataset.dy || 0);
      var w = r[2] * s * z, h = r[3] * s * z;
      p.style.width = w + 'px'; p.style.height = h + 'px';
      p.style.left = (cx - w / 2) + 'px'; p.style.top = (cy - h / 2) + 'px';
      p.style.backgroundImage = 'url("' + img.getAttribute('src') + '")';
      p.style.backgroundSize = (nw * s * z) + 'px auto';
      p.style.backgroundPosition = (-r[0] * s * z) + 'px ' + (-r[1] * s * z) + 'px';
      var c = p.nextElementSibling;
      if (c && c.classList.contains('callout')) {
        var side = c.dataset.side || 'right', gap = 30, left, top;
        if (side === 'right') { left = cx + w / 2 + gap; top = cy - 50; }
        else if (side === 'left') { left = cx - w / 2 - gap - 380; top = cy - 50; }
        else if (side === 'below') { left = cx - w / 2; top = cy + h / 2 + gap; }
        else { left = cx - w / 2; top = cy - h / 2 - gap - 120; }
        c.style.left = left + 'px'; c.style.top = top + 'px';
      }
    });
  }

  function all() { fitLive(); placePops(); sync(); }
  window.liveSync = sync;
  new MutationObserver(sync).observe(document.getElementById('stage'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  addEventListener('resize', all);
  addEventListener('load', all);
  document.fonts && document.fonts.ready.then(all);
  all();
})();
