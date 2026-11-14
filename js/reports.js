EAD.ready.then(() => {
 const tb = document.getElementById('rrows'); if (!tb) return;
 const DATA = [['2026-09-03','Logins','Monthly logins',412],['2026-09-18','Registrations','New sign-ups',23],['2026-10-02','Logins','Monthly logins',455],['2026-10-14','Exports','CSV exports',9],['2026-10-27','Registrations','New sign-ups',31],['2026-11-05','Logins','Monthly logins',398],['2026-11-09','Exports','CSV exports',14]];
 const from = document.getElementById('from'), to = document.getElementById('to'), cat = document.getElementById('cat'), form = document.getElementById('rform');
 let rows = DATA;
 function render() {
  rows = DATA.filter(r => (!from.value || r[0] >= from.value) && (!to.value || r[0] <= to.value) && (!cat.value || r[1] === cat.value));
  tb.innerHTML = rows.map(r => `<tr><td><time datetime="${r[0]}">${r[0]}</time></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('') || '<tr><td colspan="4">No records for these filters.</td></tr>';
  document.getElementById('r-count').textContent = rows.length;
  document.getElementById('r-total').textContent = rows.reduce((s, r) => s + r[3], 0);
  document.getElementById('r-msg').textContent = `${rows.length} records match the current filters.`;
 }
 [from, to, cat].forEach(el => el.addEventListener('input', render));
 form.addEventListener('reset', () => setTimeout(render));
 document.getElementById('export').addEventListener('click', () => {
  if (!rows.length) { EAD.notify('Nothing to export for these filters.', 'error'); return; }
  const q = v => { v = String(v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
  const csv = [['Date','Category','Description','Value'], ...rows].map(r => r.map(q).join(',')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv'})); a.download = 'report.csv'; a.click(); URL.revokeObjectURL(a.href);
  EAD.notify(`Exported ${rows.length} records to report.csv.`);
 });
 render();
});
