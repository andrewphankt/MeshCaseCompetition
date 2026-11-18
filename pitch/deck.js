/* Mesh pitch deck: navigation, steps, motion, script. Keys: ← → Space, N script, S full script, F full screen. */
(function () {
  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0, step = 0, timers = [];

  function fit() {
    var s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
  }
  addEventListener('resize', fit); fit();

  /* Mesh mark: the app's own logo, dot for dot (cx, cy, r, opacity) */
  var MARK = '2.31,8.39,1.3,0.77 -2.91,6.72,1.41,0.86 0.44,9.54,1.02,0.57 3.55,4.85,1.48,0.91 -6.41,6.85,1.19,0.69 5.97,7.5,1.04,0.59 -1.96,2.17,1.58,0.98 -3.67,7.9,0.85,0.45 7.81,3.08,1.33,0.8 -7.96,2.38,1.34,0.81 3.76,6.8,0.77,0.38 2.72,-0.97,1.58,0.98 -8.01,4.31,0.91,0.49 9.18,2.66,1.02,0.57 -5.46,-2.11,1.49,0.92 -1.23,4.89,0.63,0.28 7.34,-2.44,1.39,0.84 -9.59,-0.43,1.09,0.62 6.78,2.17,0.72,0.35 -0.44,-5.4,1.51,0.93 -6.02,1.36,0.67,0.31 9.17,-2.83,1.08,0.61 -7.46,-5.05,1.26,0.74 1.95,0.46,0.56,0.23 4.28,-7.07,1.34,0.81 -7.92,-3.22,0.84,0.43 7.23,-3.38,0.78,0.39 -2.91,-8.37,1.28,0.76 -2.39,-2.95,0.59,0.25 5.76,-7.67,1.06,0.6 -5.64,-7.51,0.97,0.53 2.71,-5.54,0.67,0.31 0.67,-9.57,1.06,0.6 -1.83,-7.77,0.78,0.39';
  function buildMark(svg) {
    var out = '';
    MARK.split(' ').forEach(function (d) {
      var v = d.split(',');
      out += '<circle cx="' + v[0] + '" cy="' + v[1] + '" r="' + v[2] + '" opacity="' + v[3] + '"/>';
    });
    svg.setAttribute('viewBox', '-12 -12 24 24');
    svg.innerHTML = out;
  }
  document.querySelectorAll('svg.mark, svg.fav').forEach(buildMark);

  function gather(svg) {
    svg.classList.remove('spinning');
    if (reduce) return;
    if (svg.hasAttribute('data-spin')) later(function () { svg.classList.add('spinning'); }, 2400);
    var dots = svg.querySelectorAll('circle');
    svg.classList.add('scatter');
    dots.forEach(function (c) {
      var a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60;
      c.style.transform = 'translate(' + (Math.cos(a) * d).toFixed(1) + 'px,' + (Math.sin(a) * d).toFixed(1) + 'px)';
      c.style.opacity = '0';
    });
    void svg.getBoundingClientRect();
    requestAnimationFrame(function () {
      svg.classList.remove('scatter');
      dots.forEach(function (c, i) { c.style.transitionDelay = (0.15 + i * 0.018) + 's'; c.style.transform = ''; c.style.opacity = ''; });
    });
  }

  /* Terminals: lines appear on a timeline when the slide opens */
  function playTerms(slide) {
    slide.querySelectorAll('.tx p[data-at]').forEach(function (p) {
      p.style.visibility = 'hidden';
      later(function () { p.style.visibility = ''; }, +p.dataset.at);
    });
    slide.querySelectorAll('.term[data-clash]').forEach(function (t) {
      t.classList.remove('clash');
      later(function () { t.classList.add('clash'); }, +t.dataset.clash);
    });
  }
  function later(fn, ms) { timers.push(setTimeout(fn, reduce ? 0 : ms)); }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  /* Steps */
  function steps(i) { return slides[i].querySelectorAll('[data-step]'); }
  function maxStep(i) { var m = 0; steps(i).forEach(function (e) { m = Math.max(m, +e.dataset.step); }); return m; }
  function paintSteps() {
    steps(cur).forEach(function (e) { e.classList.toggle('hide', +e.dataset.step > step); });
    /* step captions: only the current one is marked */
    slides[cur].querySelectorAll('[data-cap]').forEach(function (e) { e.classList.toggle('now', +e.dataset.cap === step); });
  }

  /* Sections along the bottom */
  var progress = document.getElementById('progress'), secNames = [], secOf = [];
  slides.forEach(function (s, i) {
    var name = s.dataset.section || (secNames.length ? secNames[secNames.length - 1] : '');
    if (s.dataset.section && secNames[secNames.length - 1] !== name) secNames.push(name);
    secOf[i] = secNames.indexOf(name);
  });
  secNames.forEach(function (n) {
    var seg = document.createElement('div'); seg.className = 'seg';
    seg.innerHTML = '<div class="bar"><i></i></div><div class="lab"></div>';
    seg.querySelector('.lab').textContent = n;
    progress.appendChild(seg);
  });
  function paintProgress() {
    var segs = progress.querySelectorAll('.seg'), sec = secOf[cur];
    segs.forEach(function (seg, k) {
      var idx = []; secOf.forEach(function (v, i) { if (v === k) idx.push(i); });
      var pct = k < sec ? 100 : k > sec ? 0 : ((idx.indexOf(cur) + 1) / idx.length) * 100;
      seg.querySelector('.bar i').style.width = pct + '%';
      seg.classList.toggle('now', k === sec);
    });
    stage.classList.toggle('is-dark', slides[cur].classList.contains('dark'));
    stage.classList.toggle('no-progress', slides[cur].hasAttribute('data-noprogress'));
  }

  /* Screen slots: show the screenshot if the file is there, else the labelled placeholder */
  document.querySelectorAll('.screen img').forEach(function (img) {
    img.addEventListener('load', function () { img.parentNode.classList.add('has-img'); });
    img.addEventListener('error', function () { img.remove(); });
  });

  function go(i, s) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    clearTimers();
    slides.forEach(function (el, k) {
      el.classList.toggle('on', k === i);
      el.classList.toggle('before', k < i);
      el.classList.toggle('after', k > i);
    });
    var entering = i !== cur || s === undefined;
    cur = i; step = s || 0; paintSteps(); paintProgress();
    if (entering) {
      var m = slides[cur].querySelector('svg.mark'); if (m) gather(m);
      playTerms(slides[cur]);
    }
    if (location.hash !== '#' + (cur + 1)) history.replaceState(null, '', '#' + (cur + 1));
    renderNotes();
  }
  function next() { if (step < maxStep(cur)) { step++; paintSteps(); } else go(cur + 1); }
  function prev() { if (step > 0) { step--; paintSteps(); } else if (cur > 0) { go(cur - 1); step = maxStep(cur); paintSteps(); } }

  /* Script */
  var notes = document.getElementById('notes'), view = document.getElementById('scriptview');
  function scriptOf(i) { var a = slides[i].querySelector('.script'); return a ? a.innerHTML : ''; }
  function renderNotes() {
    if (notes.hidden) return;
    notes.innerHTML = '<b>Say · ' + (cur + 1) + ' / ' + slides.length + '</b>' + scriptOf(cur);
  }
  function toggleNotes() { notes.hidden = !notes.hidden; renderNotes(); }
  function toggleView() {
    if (!view.hidden) { view.hidden = true; return; }
    var html = '<h1>Mesh: what we say</h1><p class="hint">One block per slide. Press S to go back.</p>';
    slides.forEach(function (s, i) {
      html += '<section><h2>' + (i + 1) + ' · ' + (s.dataset.title || '') + '</h2><p>' + scriptOf(i) + '</p></section>';
    });
    view.innerHTML = html; view.hidden = false; view.scrollTop = 0;
  }

  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'n' || k === 'N') toggleNotes();
    else if (k === 's' || k === 'S') toggleView();
    else if (k === 'f' || k === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
    else if (k === 'Escape') { notes.hidden = true; view.hidden = true; }
  });
  stage.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    if (e.clientX < innerWidth * 0.25) prev(); else next();
  });

  var start = parseInt((location.hash || '').slice(1), 10);
  go(isNaN(start) ? 0 : start - 1);
})();
