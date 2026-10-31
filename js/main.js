/* Taberna Tomasa · comportamiento mínimo (sin dependencias) */
(function () {
  'use strict';

  /* ---------- Menú hamburguesa ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.hidden = !open;
  }

  burger.addEventListener('click', function () {
    setMenu(menu.hidden);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!menu.hidden && !e.target.closest('.header')) setMenu(false);
  });

  /* ---------- Pestañas de la carta ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

  function selectTab(i, focus) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); selectTab((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); selectTab((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  selectTab(0);

  /* ---------- Horario: estado de hoy ----------
     El horario se lee de los <li data-day data-open data-close> de #hours,
     así sólo hay que cambiarlo en el HTML. Hora de Madrid. */
  var DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var rows = Array.prototype.slice.call(document.querySelectorAll('#hours li'));
  var sched = {};
  rows.forEach(function (li) {
    var d = Number(li.dataset.day);
    sched[d] = li.dataset.open ? { o: Number(li.dataset.open), c: Number(li.dataset.close), li: li } : { li: li };
  });

  function madridNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      return { wd: wd, hr: Number(map.hour) % 24 + Number(map.minute) / 60 };
    } catch (e) {
      var n = new Date();
      return { wd: n.getDay(), hr: n.getHours() + n.getMinutes() / 60 };
    }
  }

  var status = document.getElementById('status');
  var label = status.querySelector('.status__label');
  var detail = status.querySelector('.status__detail');
  var now = madridNow();
  var today = sched[now.wd];
  if (today && today.li) today.li.classList.add('is-today');

  if (today && today.o !== undefined && now.hr >= today.o && now.hr < today.c) {
    status.dataset.state = 'open';
    label.textContent = 'Estamos abiertos';
    detail.textContent = 'hoy hasta las ' + today.c + ':00';
  } else if (today && today.o !== undefined && now.hr < today.o) {
    status.dataset.state = 'later';
    label.textContent = 'Hoy abrimos';
    detail.textContent = 'de ' + today.o + ':00 a ' + today.c + ':00';
  } else {
    var next = null;
    for (var i = 1; i <= 7 && !next; i++) {
      var d = (now.wd + i) % 7;
      if (sched[d] && sched[d].o !== undefined) next = { d: d, o: sched[d].o };
    }
    status.dataset.state = 'closed';
    label.textContent = 'Ahora estamos cerrados';
    detail.textContent = next ? 'volvemos el ' + DAYS[next.d] + ' a las ' + next.o + ':00' : '';
  }

  /* ---------- Año del pie ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
