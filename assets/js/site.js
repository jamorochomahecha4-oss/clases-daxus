/* De Luz Hotel · scripts del sitio (sin dependencias)
   Cada bloque comprueba que sus elementos existan, así el mismo archivo
   sirve para la página de inicio y para las fichas de habitación. */
(function () {
  'use strict';

  /* ── Configuración: cambiar aquí si cambian los datos del hotel ── */
  var HOTEL = 'De Luz Hotel';
  var WHATSAPP = '18094849331'; // sin "+" ni espacios

  document.documentElement.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Cabecera sólida al hacer scroll + barra fija en móvil */
  var hdr = $('#top'), mbar = $('#mbar');
  var solidAlways = document.body.classList.contains('page-inner');
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle('solid', solidAlways || y > 40);
    if (mbar) mbar.classList.toggle('show', y > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  var burger = $('#burger');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (hdr) hdr.style.color = '';
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var o = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(o));
      hdr.style.color = o ? '#fff' : '';
    });
    $$('#drawer a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* Interruptor día / noche (portada) */
  var copy = {
    night: 'Cuartos claros de día, <em>cálidos</em> de noche.',
    day: 'Muros blancos, madera y <em>verde</em> alrededor.'
  };
  function setMode(m) {
    document.body.classList.toggle('is-night', m === 'night');
    document.body.classList.toggle('is-day', m === 'day');
    var n = $('#heroNight'), d = $('#heroDay'), t = $('#heroTitle');
    if (n) n.classList.toggle('off', m !== 'night');
    if (d) d.classList.toggle('off', m !== 'day');
    if (t) t.innerHTML = copy[m];
    $$('.dn button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
  }
  if ($('.dn')) {
    $$('.dn button').forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.mode); }); });
    setMode('night');
  }

  /* Fechas por defecto: dentro de 7 días, 2 noches */
  function iso(d) { return d.toISOString().slice(0, 10); }
  var t1 = new Date(); t1.setDate(t1.getDate() + 7);
  var t2 = new Date(t1); t2.setDate(t1.getDate() + 2);
  $$('[data-date="in"]').forEach(function (i) { i.value = iso(t1); i.min = iso(new Date()); });
  $$('[data-date="out"]').forEach(function (i) { i.value = iso(t2); i.min = iso(new Date()); });
  function fmt(v) { if (!v) return '—'; var p = v.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function nights(a, b) { return Math.max(1, Math.round((new Date(b) - new Date(a)) / 864e5)); }

  /* Consulta por WhatsApp: panel con el mensaje redactado */
  var sheet = $('#sheet');
  function waUrl(txt) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(txt); }
  function openSheet(txt) {
    if (!sheet) { window.open(waUrl(txt), '_blank', 'noopener'); return; }
    $('#bubble').textContent = txt;
    $('#waLink').href = waUrl(txt);
    sheet.classList.add('open');
    $('#waLink').focus();
  }
  function closeSheet() { if (sheet) sheet.classList.remove('open'); }
  $$('[data-close-sheet]').forEach(function (b) { b.addEventListener('click', closeSheet); });

  var chosenRoom = document.body.dataset.room || '';
  $$('[data-room]').forEach(function (a) { a.addEventListener('click', function () { chosenRoom = a.dataset.room; }); });

  $$('form[data-ask]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var din = $('[data-date="in"]', f).value, dout = $('[data-date="out"]', f).value;
      if (dout <= din) { $('[data-date="out"]', f).focus(); return; }
      var name = $('[name="nombre"]', f), room = $('[name="habitacion"]', f), msg = $('[name="mensaje"]', f);
      var guests = $('[name="huespedes"]', f).value, n = nights(din, dout);
      var r = room ? room.value : chosenRoom;
      var txt = 'Hola, ' + HOTEL + '.' + (name && name.value.trim() ? ' Soy ' + name.value.trim() + '.' : '') +
        ' Quisiera consultar disponibilidad' + (r && r !== 'No lo sé aún' ? ' para: ' + r : '') + '.\n\n' +
        'Llegada: ' + fmt(din) + '\nSalida: ' + fmt(dout) + ' (' + n + ' noche' + (n > 1 ? 's' : '') + ')\n' +
        'Huéspedes: ' + guests + (msg && msg.value.trim() ? '\n\n' + msg.value.trim() : '') + '\n\n¡Gracias!';
      openSheet(txt);
    });
  });

  var copyBtn = $('#copyMsg');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var txt = $('#bubble').textContent;
    var done = function (l) { copyBtn.textContent = l; setTimeout(function () { copyBtn.textContent = 'Copiar mensaje'; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { done('Copiado ✓'); }, function () { done('No se pudo copiar'); });
  });

  /* Deslizadores de fotos */
  $$('[data-slider]').forEach(function (sl) {
    var track = $('.track', sl), n = track.children.length, dots = $('.dots', sl), i = 0;
    for (var k = 0; k < n; k++) dots.appendChild(document.createElement('i'));
    function go(k) {
      i = (k + n) % n;
      track.style.transform = 'translateX(-' + i * 100 + '%)';
      $$('i', dots).forEach(function (d, j) { d.classList.toggle('on', j === i); });
    }
    $('.prev', sl).addEventListener('click', function () { go(i - 1); });
    $('.next', sl).addEventListener('click', function () { go(i + 1); });
    var x0 = null;
    sl.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
  });

  /* Galería con filtros + visor ampliado.
     Las miniaturas se escriben en el HTML (mejor para buscadores); el script solo las anima. */
  var grid = $('[data-gallery]'), lb = $('#lb');
  if (grid && lb) {
    var items = $$('button', grid), cur = 0;
    $$('.filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filters button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        items.forEach(function (g) { g.classList.toggle('hide', b.dataset.f !== 'all' && g.dataset.c !== b.dataset.f); });
      });
    });
    var visible = function () { return items.filter(function (b) { return !b.classList.contains('hide'); }); };
    function show(btn) {
      cur = items.indexOf(btn);
      var img = $('img', btn);
      $('#lbImg').src = btn.dataset.full || img.currentSrc || img.src;
      $('#lbImg').alt = img.alt;
      $('#lbCap').textContent = img.alt;
    }
    function step(d) { var v = visible(), p = v.indexOf(items[cur]); show(v[(p + d + v.length) % v.length]); }
    items.forEach(function (b) { b.addEventListener('click', function () { show(b); lb.classList.add('open'); $('#lbX').focus(); }); });
    $('#lbX').addEventListener('click', function () { lb.classList.remove('open'); });
    $('#lbL').addEventListener('click', function () { step(-1); });
    $('#lbR').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    window.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (lb) lb.classList.remove('open'); closeSheet(); closeMenu(); }
  });

  /* Ubicación: pestañas Google Maps / Alrededores.
     El mapa de Google se carga solo cuando la sección se acerca (ahorra datos). */
  var mapTabs = $$('.map-tabs button');
  mapTabs.forEach(function (b) {
    b.addEventListener('click', function () {
      mapTabs.forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      $$('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== b.dataset.tab; });
    });
  });
  var gmap = $('iframe[data-src]');
  function loadMap() { if (gmap && !gmap.src) gmap.src = gmap.dataset.src; }
  if (gmap) {
    if ('IntersectionObserver' in window) {
      var mo = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { loadMap(); mo.disconnect(); } }, { rootMargin: '600px' });
      mo.observe(gmap);
    } else loadMap();
  }

  /* Mapa esquemático: resaltar la ruta al pasar por un lugar */
  $$('[data-p]').forEach(function (el) {
    var k = el.dataset.p;
    function on(v) { $$('[data-p="' + k + '"]').forEach(function (x) { x.classList.toggle('on', v); }); }
    el.addEventListener('mouseenter', function () { on(true); });
    el.addEventListener('mouseleave', function () { on(false); });
    el.addEventListener('focus', function () { on(true); });
    el.addEventListener('blur', function () { on(false); });
  });

  /* Aparición progresiva (el contenido siempre es visible; solo se desplaza un poco) */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* Año del pie de página */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
