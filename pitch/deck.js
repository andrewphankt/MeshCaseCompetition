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

  /* Mesh mark: dots on a disc, denser and darker toward the middle */
  function buildMark(svg) {
    var n = 38, out = '';
    for (var i = 0; i < n; i++) {
      var t = i / n, r = 9.6 * Math.sqrt(t + 0.02), a = i * 2.39996;
      var size = 1.65 - t * 1.05, op = 1 - t * 0.7;
      out += '<circle cx="' + (r * Math.cos(a)).toFixed(2) + '" cy="' + (r * Math.sin(a)).toFixed(2) + '" r="' + size.toFixed(2) + '" opacity="' + op.toFixed(2) + '"/>';
    }
    svg.setAttribute('viewBox', '-12 -12 24 24');
    svg.innerHTML = out;
  }
  document.querySelectorAll('svg.mark').forEach(buildMark);

  function gather(svg) {
    if (reduce) return;
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
  function paintSteps() { steps(cur).forEach(function (e) { e.classList.toggle('hide', +e.dataset.step > step); }); }

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
