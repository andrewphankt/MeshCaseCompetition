/* Profile pictures for the made-up team in the demos, the kind people pick on Discord:
   Sarah a fox, Iris a frog, Tony a cat, Evelyn a tanuki (her own character).
   window.avatar(k) returns an element; data-avatar="S" (or "S:claude" for an agent) fills itself. */
(function () {
  var FACES = {
    S: '<rect width="40" height="40" fill="#fdba74"/><path d="M9 13 L14 4 L18 13 Z M22 13 L26 4 L31 13 Z" fill="#ea580c"/><path d="M8 16 Q20 6 32 16 L28 29 Q20 36 12 29 Z" fill="#f97316"/><path d="M13 24 Q20 22 27 24 L23 31 Q20 34 17 31 Z" fill="#fff7ed"/><circle cx="15.5" cy="19.5" r="2" fill="#1c1917"/><circle cx="24.5" cy="19.5" r="2" fill="#1c1917"/><ellipse cx="20" cy="27" rx="2" ry="1.4" fill="#1c1917"/>',
    I: '<rect width="40" height="40" fill="#bbf7d0"/><ellipse cx="20" cy="26" rx="14" ry="10" fill="#22c55e"/><circle cx="13" cy="15" r="6" fill="#22c55e"/><circle cx="27" cy="15" r="6" fill="#22c55e"/><circle cx="13" cy="15" r="3.4" fill="#fff"/><circle cx="27" cy="15" r="3.4" fill="#fff"/><circle cx="13.6" cy="15.4" r="1.8" fill="#14532d"/><circle cx="27.6" cy="15.4" r="1.8" fill="#14532d"/><path d="M13 27 Q20 32 27 27" fill="none" stroke="#14532d" stroke-width="1.8" stroke-linecap="round"/><circle cx="11" cy="25" r="1.6" fill="#f9a8d4"/><circle cx="29" cy="25" r="1.6" fill="#f9a8d4"/>',
    T: '<rect width="40" height="40" fill="#ddd6fe"/><path d="M9 17 L10 6 L18 12 Z M31 17 L30 6 L22 12 Z" fill="#52525b"/><ellipse cx="20" cy="23" rx="13" ry="11" fill="#71717a"/><path d="M12 12 Q20 9 28 12 L27 17 Q20 14 13 17 Z" fill="#52525b"/><ellipse cx="15" cy="22" rx="2.2" ry="2.8" fill="#fde047"/><ellipse cx="25" cy="22" rx="2.2" ry="2.8" fill="#fde047"/><ellipse cx="15" cy="22.3" rx=".8" ry="2.2" fill="#1c1917"/><ellipse cx="25" cy="22.3" rx=".8" ry="2.2" fill="#1c1917"/><path d="M18.5 27 L21.5 27 L20 28.6 Z" fill="#f9a8d4"/><path d="M8 26 L14 27 M8 29 L14 28.5 M32 26 L26 27 M32 29 L26 28.5" stroke="#d4d4d8" stroke-width="1"/>',
    E: '<rect width="40" height="40" fill="#fde68a"/><circle cx="11" cy="11" r="5" fill="#a16207"/><circle cx="29" cy="11" r="5" fill="#a16207"/><circle cx="11" cy="11" r="2.4" fill="#fbcfe8"/><circle cx="29" cy="11" r="2.4" fill="#fbcfe8"/><ellipse cx="20" cy="23" rx="14" ry="12" fill="#ca8a04"/><path d="M9 21 Q14 16 19 22 Q14 27 9 21 Z M31 21 Q26 16 21 22 Q26 27 31 21 Z" fill="#422006"/><circle cx="14.5" cy="21.5" r="1.8" fill="#fff"/><circle cx="25.5" cy="21.5" r="1.8" fill="#fff"/><ellipse cx="20" cy="29" rx="6" ry="4.5" fill="#fef3c7"/><ellipse cx="20" cy="27.6" rx="1.8" ry="1.2" fill="#1c1917"/>'
  };
  function svg(k) { return '<svg viewBox="0 0 40 40" aria-hidden="true">' + (FACES[k] || FACES.S) + '</svg>'; }
  window.avatar = function (k, agent) {
    var a = document.createElement('span');
    var icon = agent && window.AGENT_ICONS && window.AGENT_ICONS[agent];
    if (icon) {
      /* Agents look the way Mesh draws them: the agent's logo, big, with its person's picture as a small badge */
      a.className = 'av pic is-agent';
      a.innerHTML = '<span class="agent-face">' + icon + '</span>';
      var b = document.createElement('i'); b.className = 'owner-badge'; b.innerHTML = svg(k); a.appendChild(b);
    } else {
      a.className = 'av pic';
      a.innerHTML = svg(k);
    }
    return a;
  };
  document.querySelectorAll('[data-avatar]').forEach(function (e) {
    var bits = e.dataset.avatar.split(':'), a = window.avatar(bits[0], bits[1]);
    a.className += ' ' + e.className.replace(/\bav\b/, '').trim();
    a.style.cssText = e.style.cssText; a.style.background = '';
    e.replaceWith(a);
  });
})();
