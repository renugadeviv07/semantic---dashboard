/* Validation uses native constraint validation + visible, programmatically linked messages. */
EAD.ready.then(() => {
 function validate(f) {
  let first = null;
  f.querySelectorAll('input,select').forEach(el => {
   const err = document.getElementById(el.id + '-err'); if (!err) return;
   const bad = !el.checkValidity();
   err.textContent = bad ? (el.dataset.msg || el.validationMessage) : '';
   if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
   if (bad && !first) first = el;
  });
  if (first) { first.focus(); EAD.notify('Please correct the highlighted fields.', 'error'); }
  return !first;
 }
 const clear = f => f.addEventListener('reset', () => f.querySelectorAll('.err').forEach(e => e.textContent = ''));
 const uf = document.getElementById('user-form');
 if (uf) {
  clear(uf);
  const id = new URLSearchParams(location.search).get('id'); let users = EAD.load(), cur = users.find(u => u.id == id);
  if (cur) { document.getElementById('ft').textContent = 'Edit user'; document.title = 'Edit user | Enterprise Accessible Dashboard'; Object.keys(cur).forEach(k => { if (uf.elements[k] && k !== 'id') uf.elements[k].value = cur[k]; }); }
  uf.addEventListener('submit', e => {
   e.preventDefault(); if (!validate(uf)) return;
   const d = Object.fromEntries(new FormData(uf));
   if (cur) Object.assign(cur, d); else users.push({id: Date.now(), ...d});
   EAD.save(users); sessionStorage.setItem('flash', `User ${d.name} was ${cur ? 'updated' : 'added'} successfully.`); location.href = 'users.html';
  });
 }
 document.querySelectorAll('form[data-settings]').forEach(f => {
  const key = 'eadSettings:' + f.id;
  try { const s = JSON.parse(localStorage.getItem(key)) || {}; [...f.elements].forEach(el => { if (el.name && el.name in s) { if (el.type === 'checkbox') el.checked = s[el.name]; else el.value = s[el.name]; } }); } catch (e) {}
  f.addEventListener('submit', e => {
   e.preventDefault(); if (!validate(f)) return;
   const s = {}; [...f.elements].forEach(el => { if (el.name) s[el.name] = el.type === 'checkbox' ? el.checked : el.value; });
   localStorage.setItem(key, JSON.stringify(s));
   if (s.textsize) document.documentElement.style.fontSize = s.textsize;
   EAD.notify('Settings saved.');
  });
 });
 const pw = document.getElementById('pw-form');
 if (pw) {
  clear(pw); const np = document.getElementById('np'), cp = document.getElementById('cp');
  pw.addEventListener('submit', e => {
   e.preventDefault(); cp.setCustomValidity(cp.value !== np.value ? 'Passwords do not match.' : '');
   if (!validate(pw)) return;
   pw.reset(); EAD.notify('Password updated (demo only: nothing is stored).');
  });
 }
});
