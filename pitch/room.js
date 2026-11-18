/* Timelines for the rebuilt Mesh room parts (room.css). Each runs, and loops, while its slide shows.
   live.js calls window.liveActs[name](el, later) when an element with data-act="name" starts showing. */
(function () {
  var acts = window.liveActs;
  var PEOPLE = {
    S: { name: 'Sarah', color: '#e8613f' }, I: { name: 'Iris', color: '#2a9d66' },
    T: { name: 'Tony', color: '#8a5cf0' }, E: { name: 'Evelyn', color: '#d99a00' }
  };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function av(k, size) { var p = PEOPLE[k]; var a = el('span', 'av', k); a.style.background = p.color; return a; }
  function row(k, text, when) {
    var r = el('div', 'r row-in');
    r.innerHTML = '<span class="chk">&#10003;</span>';
    r.appendChild(av(k));
    r.insertAdjacentHTML('beforeend', '<b></b><span></span><em></em>');
    r.querySelector('b').textContent = text; r.querySelector('span').textContent = PEOPLE[k].name; r.querySelector('em').textContent = when;
    return r;
  }
  function clearRows(box, later, then) {
    var rows = Array.prototype.slice.call(box.children);
    rows.forEach(function (r, i) { later(function () { r.className = r.className.replace('row-in', '') + ' row-out'; }, i * 160); });
    later(function () { box.innerHTML = ''; then && then(); }, rows.length * 160 + 600);
  }
  function fly(plane, btn, root, later) {
    var b = btn.getBoundingClientRect(), r = root.getBoundingClientRect(), k = root.offsetWidth / r.width;
    plane.style.left = ((b.left - r.left) * k + btn.offsetWidth / 2 - plane.offsetWidth / 2) + 'px';
    plane.style.top = ((b.top - r.top) * k) + 'px';
    plane.classList.remove('fly'); void plane.offsetWidth; plane.classList.add('fly');
    btn.classList.add('down'); later(function () { btn.classList.remove('down'); }, 200);
  }
  function loop(fn, period) {
    return function (root, later) {
      (function go() { fn(root, later); later(go, period); })();
    };
  }

  /* 1. The whole room: a change comes in, then another, then a person pushes */
  acts.room = loop(function (root, later) {
    var q = function (s) { return root.querySelector(s); };
    var rows = q('.rows'), count = q('.count'), hero = q('.hero'), cta = q('.cta'), chip = q('.chip'), site = q('.site');
    var agS = q('[data-ag="S"]'), agI = q('[data-ag="I"]');
    function status(a, on, txt) { a.classList.toggle('work', on); a.querySelector('small').textContent = txt; }
    function build(t) { chip.innerHTML = '<span class="spin"></span>Building new save'; chip.classList.add('show'); site.classList.add('reload');
      later(function () { site.classList.remove('reload'); chip.innerHTML = '&#10003; Updated'; }, t); later(function () { chip.classList.remove('show'); }, t + 1400); }
    rows.innerHTML = ''; rows.appendChild(row('T', 'Footer links updated', '1h')); rows.appendChild(row('I', 'Pricing section added', '3h'));
    count.textContent = '2 new'; hero.classList.remove('big'); cta.classList.remove('on'); q('.uptodate').classList.remove('show');
    status(agS, true, 'In index.html'); status(agI, false, 'Idle');
    later(function () { build(1300); }, 1600);
    later(function () { hero.classList.add('big'); rows.insertBefore(row('S', 'Hero title is bigger', 'now'), rows.firstChild); count.textContent = '3 new'; status(agS, false, 'Idle'); status(agI, true, 'In signup.html'); }, 2900);
    later(function () { build(1300); }, 5600);
    later(function () { cta.classList.add('on'); rows.insertBefore(row('I', 'Sign-up button added', 'now'), rows.firstChild); count.textContent = '4 new'; status(agI, false, 'Idle'); }, 6900);
    later(function () {
      fly(q('.plane'), q('.dock .btn-k'), root, later);
      later(function () { clearRows(rows, later, function () { count.textContent = 'Up to date'; q('.uptodate').classList.add('show'); }); }, 500);
    }, 9200);
  }, 13500);

  /* 2. Changes: plain-English notes arrive, newest on top */
  var NOTES = [
    ['S', "Sarah's Claude", 'The home page title is bigger and bolder, so it reads from across the room.', 'index.html'],
    ['I', "Iris's Codex", 'There is now a sign-up button right under the title.', 'signup.html · index.html'],
    ['T', "Tony's Gemini", 'The footer links all go to the right pages now.', 'footer.html']
  ];
  acts.changes = loop(function (root, later) {
    var list = root.querySelector('.list'); list.innerHTML = '';
    NOTES.forEach(function (n, i) {
      later(function () {
        var e = el('div', 'note row-in'); e.appendChild(av(n[0]));
        var d = el('div'); d.innerHTML = '<div class="who"><span></span><span class="badge">AGENT</span><em>just now</em></div><p></p><div class="files"></div>';
        d.querySelector('.who span').textContent = n[1]; d.querySelector('p').textContent = n[2]; d.querySelector('.files').textContent = n[3];
        e.appendChild(d); list.insertBefore(e, list.firstChild);
        Array.prototype.slice.call(list.children, 1).forEach(function (o) { o.querySelector('em').textContent = 'a minute ago'; });
      }, 500 + i * 2300);
    });
  }, 10500);

  /* 3. Working now: agents start and finish tasks */
  acts.working = loop(function (root, later) {
    var work = root.querySelector('.w-list'), idle = root.querySelector('.i-list'), wc = root.querySelector('.wc'), ic = root.querySelector('.ic');
    function card(k, who, task, on) {
      var e = el('div', 'wa row-in' + (on ? '' : ' idle')); e.appendChild(av(k));
      var d = el('div'); d.innerHTML = '<b></b><small></small>'; d.querySelector('b').textContent = who; d.querySelector('small').textContent = task;
      e.appendChild(d); e.appendChild(on ? el('span', 'live-dot') : el('span', 'st', 'Idle')); e.dataset.k = k; return e;
    }
    function counts() { wc.textContent = work.children.length; ic.textContent = idle.children.length; }
    function move(k, toWork, task) {
      var old = root.querySelector('.wa[data-k="' + k + '"]'), who = old.querySelector('b').textContent;
      old.classList.add('row-out');
      later(function () { old.remove(); (toWork ? work : idle).appendChild(card(k, who, toWork ? task : 'Idle', toWork)); counts(); }, 500);
    }
    work.innerHTML = ''; idle.innerHTML = '';
    work.appendChild(card('S', "Sarah's Claude", 'Making the hero title bigger', true));
    work.appendChild(card('I', "Iris's Codex", 'Adding a sign-up button', true));
    idle.appendChild(card('T', "Tony's Gemini", 'Idle', false));
    counts();
    later(function () { move('T', true, 'Fixing the footer links'); }, 2200);
    later(function () { move('S', false); }, 4600);
    later(function () { move('S', true, 'Writing the pricing section'); }, 7000);
  }, 10000);

  /* 4. Preview tabs: add a page, it opens in its own tab */
  acts.tabs = loop(function (root, later) {
    var strip = root.querySelector('.strip'), plus = root.querySelector('.plus'), menu = root.querySelector('.menu');
    var pages = root.querySelectorAll('.page'), tabs = function () { return strip.querySelectorAll('.tb'); };
    function show(i) { tabs().forEach(function (t, k) { t.classList.toggle('on', k === i); }); pages.forEach(function (p, k) { p.classList.toggle('off', k !== i); }); }
    var extra = strip.querySelector('.tb.new'); if (extra) extra.remove();
    menu.classList.remove('show'); menu.querySelectorAll('div').forEach(function (d) { d.classList.remove('hl'); });
    show(0);
    later(function () { show(1); }, 1500);
    later(function () { plus.classList.add('down'); later(function () { plus.classList.remove('down'); menu.classList.add('show'); }, 180); }, 3000);
    later(function () { menu.querySelector('[data-p="2"]').classList.add('hl'); }, 3900);
    later(function () {
      menu.classList.remove('show');
      var t = el('span', 'tb new', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2"/></svg>prototype');
      strip.insertBefore(t, plus); later(function () { show(2); }, 250);
    }, 4700);
    later(function () { show(0); }, 7600);
  }, 9600);

  /* 5. Push: a person presses Push, the plane leaves, the list clears */
  var PUSHROWS = [['S', 'Hero title is bigger', '2m'], ['I', 'Sign-up button added', '9m'], ['T', 'Footer links updated', '1h']];
  acts.push = loop(function (root, later) {
    var rows = root.querySelector('.rows'), count = root.querySelector('.count'), done = root.querySelector('.pushed'), up = root.querySelector('.uptodate');
    rows.innerHTML = ''; PUSHROWS.forEach(function (r) { rows.appendChild(row(r[0], r[1], r[2])); });
    count.textContent = '3 new'; done.classList.remove('show'); up.classList.remove('show');
    later(function () {
      fly(root.querySelector('.plane'), root.querySelector('.dh .btn-k'), root, later);
      later(function () { clearRows(rows, later, function () { count.textContent = 'Up to date'; up.classList.add('show'); done.classList.add('show'); }); }, 450);
    }, 2000);
  }, 8500);
})();
