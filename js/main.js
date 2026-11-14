/* Shared helpers: component loader, storage, notifications. localStorage = demo storage only. */
const root = document.body.dataset.root || '';
const SEED = [
 {id:1,name:'Asha Raman',email:'asha@example.com',phone:'+91 98765 43210',dept:'Engineering',role:'Administrator',gender:'Female',status:'Active'},
 {id:2,name:'Daniel Cho',email:'daniel@example.com',phone:'+1 555 0101',dept:'Finance',role:'Manager',gender:'Male',status:'Active'},
 {id:3,name:'Priya Nair',email:'priya@example.com',phone:'+91 91234 56789',dept:'HR',role:'Analyst',gender:'Female',status:'Pending'},
 {id:4,name:'Marcus Webb',email:'marcus@example.com',phone:'+44 20 7946 0000',dept:'Sales',role:'Viewer',gender:'Male',status:'Inactive'}];
const EAD = {
 root,
 esc: s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 load() { try { const u = JSON.parse(localStorage.getItem('eadUsers')); if (u) return u; } catch (e) {} EAD.save(SEED); return SEED.slice(); },
 save(u) { localStorage.setItem('eadUsers', JSON.stringify(u)); },
 notify(msg, type = 'success') {
  let box = document.getElementById('alerts');
  if (!box) { box = document.createElement('div'); box.id = 'alerts'; box.className = 'alerts'; document.body.appendChild(box); }
  const a = document.createElement('p');
  a.className = 'alert ' + type; a.setAttribute('role', type === 'error' ? 'alert' : 'status'); a.textContent = msg;
  box.appendChild(a); setTimeout(() => a.remove(), 6000);
 }
};
EAD.ready = Promise.all([...document.querySelectorAll('[data-include]')].map(async el => {
 try {
  const r = await fetch(root + 'components/' + el.dataset.include + '.html');
  if (!r.ok) throw new Error(r.status);
  el.outerHTML = (await r.text()).replaceAll('{{root}}', root);
 } catch (e) { EAD.notify('Components failed to load. Serve the folder over http (see README).', 'error'); }
}));
EAD.ready.then(() => {
 const users = EAD.load();
 const stat = {total: users.length, active: users.filter(u => u.status === 'Active').length, inactive: users.filter(u => u.status === 'Inactive').length, pending: users.filter(u => u.status === 'Pending').length, depts: new Set(users.map(u => u.dept)).size};
 document.querySelectorAll('[data-stat]').forEach(el => el.textContent = stat[el.dataset.stat]);
 try { const p = JSON.parse(localStorage.getItem('eadSettings:prefs-form')); if (p && p.textsize) document.documentElement.style.fontSize = p.textsize; } catch (e) {}
 const f = sessionStorage.getItem('flash'); if (f) { sessionStorage.removeItem('flash'); EAD.notify(f); }
});
