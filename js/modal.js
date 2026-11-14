/* Uses native <dialog>.showModal(): focus moves in, is trapped, Escape closes, focus returns to opener. */
EAD.confirm = msg => new Promise(res => {
 const d = document.getElementById('confirm-dialog');
 d.querySelector('#confirm-msg').textContent = msg; d.returnValue = '';
 d.addEventListener('close', () => res(d.returnValue === 'yes'), {once: true});
 d.showModal();
});
