EAD.ready.then(() => {
 const here = location.pathname.split('/').pop() || 'index.html';
 document.querySelectorAll('#sidebar a').forEach(a => { if (a.getAttribute('href').split('/').pop() === here) a.setAttribute('aria-current', 'page'); });
 const btn = document.getElementById('menu-btn'), sb = document.getElementById('sidebar');
 if (btn && sb) {
  btn.addEventListener('click', () => { const o = sb.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  sb.addEventListener('keydown', e => { if (e.key === 'Escape' && sb.classList.contains('open')) { sb.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
 }
});
