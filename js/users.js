EAD.ready.then(() => {
 const tb = document.getElementById('rows'); if (!tb) return;
 const q = document.getElementById('q'), fd = document.getElementById('fdept'), fs = document.getElementById('fstatus'), cnt = document.getElementById('count');
 let users = EAD.load(), sort = {k: 'name', d: 1};
 function render() {
  const s = q.value.toLowerCase();
  const r = users.filter(u => (!s || (u.name + u.email).toLowerCase().includes(s)) && (!fd.value || u.dept === fd.value) && (!fs.value || u.status === fs.value))
   .sort((a, b) => a[sort.k].localeCompare(b[sort.k]) * sort.d);
  const e = EAD.esc;
  tb.innerHTML = r.map(u => `<tr><th scope="row">${e(u.name)}</th><td>${e(u.email)}</td><td>${e(u.dept)}</td><td>${e(u.role)}</td><td>${e(u.status)}</td><td class="actions"><a class="btn" href="add-user.html?id=${u.id}">Edit<span class="sr-only"> ${e(u.name)}</span></a> <button type="button" class="btn danger" data-del="${u.id}">Delete<span class="sr-only"> ${e(u.name)}</span></button></td></tr>`).join('') || '<tr><td colspan="6">No users match your search.</td></tr>';
  cnt.textContent = `${r.length} of ${users.length} users shown`;
  document.querySelectorAll('th[data-k]').forEach(h => h.setAttribute('aria-sort', h.dataset.k === sort.k ? (sort.d > 0 ? 'ascending' : 'descending') : 'none'));
 }
 [q, fd, fs].forEach(el => el.addEventListener('input', render));
 document.querySelectorAll('th[data-k] button').forEach(b => b.addEventListener('click', () => { const k = b.parentElement.dataset.k; sort = {k, d: sort.k === k ? -sort.d : 1}; render(); }));
 tb.addEventListener('click', async e => {
  const b = e.target.closest('[data-del]'); if (!b) return;
  const u = users.find(x => x.id == b.dataset.del);
  if (await EAD.confirm(`Delete ${u.name}? This cannot be undone.`)) {
   users = users.filter(x => x.id != u.id); EAD.save(users); render(); EAD.notify(`${u.name} was deleted.`); q.focus();
  }
 });
 render();
});
